import {IShape} from "../IShape";
import {Scene} from "../../scene/Scene";
import {vec4} from "../../math";
import {Line} from "./Line";

export class Plane extends IShape {
    private model: Line[] = [];

    constructor(scene: Scene, p1: vec4, p2: vec4, p3: vec4, p4: vec4) {
        super(scene);

        this.model.push(new Line(scene, p1, p2));
        this.model.push(new Line(scene, p2, p3));
        this.model.push(new Line(scene, p3, p4));
        this.model.push(new Line(scene, p4, p1));
    }

    Move(vec: vec4) {
    }

    Render(): void {
        this.model.forEach(line => {
            line.Render();
        })
    }

    Rotate(vec: vec4) {
    }

    Scale(vec: vec4) {
    }

    IsInsideView(): boolean {
        let isInside = true;
        this.model.forEach(line => {
            if(line.IsInsideView())
                isInside = false;
        })

        return isInside;
    }
}