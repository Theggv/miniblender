import {IShape} from "../IShape";
import {vec4, mat4, vec3} from "../../math";
import {Scene} from "../../scene/Scene";
import {DepthVS} from "../../shader/DepthVS";

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
        this.scene.Renderer.drawCircle(
            this.ToView()
        );

        console.log(this.ToView());
    }

    ToView(): vec4 {
        let vec = DepthVS.Transform(this.model);

        console.log(
            vec.x.toFixed(3),
            vec.y.toFixed(3),
            vec.z.toFixed(3));

        return vec;
    }

    IsInsideView(): boolean {
        let mat = DepthVS.ViewMatrix
            .mul(DepthVS.Projection);

        let point = vec4.mulVecMat(this.model, mat);

        console.log(point.x + '\t' + point.y + '\t' + point.z + '\t' + point.w);

        if(point.x < -point.w || point.x > point.w)
            return false;
        if(point.y < -point.w || point.y > point.w)
            return false;
        if(point.z < -point.w || point.z > point.w)
            return false;


        return true;
    }
}