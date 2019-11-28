import {vec4, mat4, vec3, radians, vec2} from "../math";
import {Scene} from "./Scene";
import {CameraControl} from "./CameraControl";

export class Camera {
    private pressedKeys;
    private lastPos: vec2;
    private control: CameraControl;

    // Attributes
    Position: vec3;
    Front: vec3;
    Up: vec3;
    Right: vec3;
    WorldUp: vec3;

    // Eular angles
    Yaw: number;
    Pitch: number;

    // Options
    MovementSpeed: number;
    Sensivity: number;
    Zoom: number;
    Mod: ViewMod = ViewMod.Perspective;

    // Attach
    IsAttached: boolean;
    AttachPosition: vec3;

    get ViewMatrix(): mat4 {
        if(this.IsAttached)
            return mat4.lookAt(this.Position, this.AttachPosition);

        return mat4.lookAt(this.Position, vec3.plus(this.Position, this.Front));
    }

    static PerspectiveMatrix(width: number, height: number): mat4 {
        return mat4.perspective(
            90, width / height, 0.1, 1000);
    }

    static OrthographicMatrix(width: number, height: number): mat4 {
        return mat4.ortho(
            0.1, 1000,
            -width / 2, -height / 2,
            width / 2, height / 2);
    }

    static ViewPort(width: number, height: number): mat4 {
        return mat4.viewPort(width, height);
    }

    /**
     * Создает камеру
     * @constructor
     * @param worldPos Позиция камеры в сцене
     * @param viewAngles Углы наклона камеры
     * @param viewDistance Растояние от положения камеры
     */
    constructor(
        pos: vec3 = new vec3(),
        yaw: number = 60,
        pitch: number = -30
    ) {
        this.Position = pos;
        this.WorldUp = new vec3(0, 1, 0);
        this.Yaw = yaw;
        this.Pitch = pitch;

        this.IsAttached = false;
        this.AttachPosition = new vec3();

        this.control = new CameraControl(this);

        this.update();
    }

    ChangeMod(): void {
        if(this.Mod == ViewMod.Perspective)
            this.Mod = ViewMod.Orthographic;
        else
            this.Mod = ViewMod.Perspective;
    }

    SetPerspectiveMod(): void {
        this.Mod = ViewMod.Perspective;
    }

    SetOrhtographicMod(): void {
        this.Mod = ViewMod.Orthographic;
    }

    SetPosition(vec: vec3): void {
        this.Position = vec;
        this.update();
    }

    Move(vec: vec3): void {
        this.Position = vec3.plus(this.Position, vec);
        this.update();
    }

    SetAngles(vec: vec3): void {
        this.Yaw = vec.x;
        this.Pitch = vec.y;

        this.fixAngles();
    }

    AddAngles(vec: vec3) : void {
        this.Yaw += vec.x;
        this.Pitch += vec.y;

        this.fixAngles();
    }

    ChangeZoom(value: number): void {
        this.Zoom += value;

        if(this.Zoom < 1)
            this.Zoom = 1;

        if(this.Zoom > 45)
            this.Zoom = 45;
    }

    private fixAngles(): void {
        if(this.Pitch < -89)
            this.Pitch = -89;

        if(this.Pitch > 89)
            this.Pitch = 89;

        this.Yaw = (this.Yaw + 360) % 360;
    }


    update(): void {
        this.Front = new vec3(
            Math.cos(radians(this.Pitch)) * Math.cos(radians(this.Yaw)),
            Math.sin(radians(this.Pitch)),
            Math.cos(radians(this.Pitch)) * Math.sin(radians(this.Yaw)),
        ).normalize();

        this.Right = vec3.cross(this.WorldUp, this.Front).normalize();
        this.Up = vec3.cross(this.Front, this.Right).normalize();

        this.control.updateMove();

        document.getElementById('camera-posx')['value'] = this.Position.x.toFixed(1).toString();
        document.getElementById('camera-posy')['value'] = this.Position.y.toFixed(1).toString();
        document.getElementById('camera-posz')['value'] = this.Position.z.toFixed(1).toString();
        document.getElementById('camera-pitch')['value'] = this.Pitch.toFixed(1).toString();
        document.getElementById('camera-yaw')['value'] = this.Yaw.toFixed(1).toString();
        document.getElementById('camera-roll')['value'] = '0';
    }
}

export enum ViewMod {
    Perspective,
    Orthographic
}