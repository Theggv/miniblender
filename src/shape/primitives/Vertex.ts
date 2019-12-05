import {IShape} from "../IShape";
import {vec4, mat4, vec3} from "../../math";
import {Scene} from "../../scene/Scene";
import {DepthVS} from "../../shader/DepthVS";
import {Frustum} from "../../renderer/Frustum";

export class Vertex extends IShape {
    private model: vec4;

    get X(): number {
        return this.model.x;
    }

    get Y(): number {
        return this.model.y;
    }

    get Z(): number {
        return this.model.z;
    }

    get Point(): vec3 {
        return this.model.normalize3();
    }

    constructor(scene: Scene, vec: vec4) {
        super(scene);

        this.model = vec;
    }

    Move(vec: vec4) {
        this.model = mat4.mulVec(this.model, mat4.translate(vec));
        this.HasChanges = true;
    }

    Rotate(vec: vec4) {
        this.HasChanges = false;
    }

    Scale(vec: vec4) {
        this.HasChanges = false;
    }

    Render(): void {
        if(!this.IsVisible())
            return;

        this.scene.Renderer.drawCircle(
            this.ToView()
        );

        console.log(this.ToView());
    }

    ToView(): vec4 {
        let vec: vec4;
        vec = DepthVS.Transform(this.model);
        // vec.z = DepthVS.LinearDepthTest(vec.z);

        console.log(
            vec.x.toFixed(3),
            vec.y.toFixed(3),
            vec.z.toFixed(3));

        return vec;
    }

    IsVisible(): boolean {
        return Frustum.Instance.IsPointInside(this.Point);
    }
}