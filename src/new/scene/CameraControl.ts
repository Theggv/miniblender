import {Camera} from "./Camera";
import {vec2, vec3} from "../math";

export class CameraControl {
    private pressedKeys;
    private lastPos: vec2;
    private cam: Camera;

    public Sensivity: number;
    public Speed: number;

    constructor(cam: Camera) {
        this.cam = cam;

        this.Sensivity = 0.25;
        this.Speed = 5;

        document.getElementById('camera-posx').addEventListener('input', (e: any) => {
            cam.Position.x = Number(e.target.value);
        });
        document.getElementById('camera-posy').addEventListener('input', (e: any) => {
            cam.Position.y = Number(e.target.value);
        });
        document.getElementById('camera-posz').addEventListener('input', (e: any) => {
            cam.Position.z = Number(e.target.value);
        });
        document.getElementById('camera-pitch').addEventListener('input', (e: any) => {
            cam.Pitch = Number(e.target.value);
        });
        document.getElementById('camera-yaw').addEventListener('input', (e: any) => {
            cam.Yaw = Number(e.target.value);
        });
        document.getElementById('camera-roll').addEventListener('input', (e: any) => {

        });

        document.addEventListener('keydown', (e: any) => {
            if(e.code == 'KeyW') {
                this.pressedKeys |= (1 << 0);
            }
            else if(e.code == 'KeyA') {
                this.pressedKeys |= (1 << 1);
            }
            else if(e.code == 'KeyS') {
                this.pressedKeys |= (1 << 2);
            }
            else if(e.code == 'KeyD') {
                this.pressedKeys |= (1 << 3);
            }
        });

        document.addEventListener('keyup', (e: any) => {
            if(e.code == 'KeyW') {
                this.pressedKeys &= ~(1 << 0);
            }
            else if(e.code == 'KeyA') {
                this.pressedKeys &= ~(1 << 1);
            }
            else if(e.code == 'KeyS') {
                this.pressedKeys &= ~(1 << 2);
            }
            else if(e.code == 'KeyD') {
                this.pressedKeys &= ~(1 << 3);
            }
        });

        document.getElementById('canv-main')
            .addEventListener('mousedown', (e: any) => {
            this.lastPos = new vec2(e.layerX, e.layerY);
        });

        document.getElementById('canv-main')
            .addEventListener('mousemove', (e: any) => {
            if(!(e.buttons & 1))
                return;
            let offset = new vec2(e.layerX - this.lastPos.x,
                this.lastPos.y - e.layerY);

            this.lastPos = new vec2(e.layerX, e.layerY);

            this.cam.AddAngles(new vec3(
                offset.x * this.Sensivity, offset.y * this.Sensivity
            ));
        });
    }

    updateMove(): void {
        // W
        if (this.pressedKeys & (1 << 0))
            this.cam.Position = vec3.plus(this.cam.Position, vec3.mulScalar(this.cam.Front, this.Speed));

        // A
        if (this.pressedKeys & (1 << 1))
            this.cam.Position = vec3.plus(this.cam.Position, vec3.mulScalar(this.cam.Right, this.Speed));

        // S
        if (this.pressedKeys & (1 << 2))
            this.cam.Position = vec3.minus(this.cam.Position, vec3.mulScalar(this.cam.Front, this.Speed));

        // D
        if (this.pressedKeys & (1 << 3))
            this.cam.Position = vec3.minus(this.cam.Position, vec3.mulScalar(this.cam.Right, this.Speed));
    }
}