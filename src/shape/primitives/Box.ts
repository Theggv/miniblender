import {IShape} from "../IShape";
import {Scene} from "../../scene/Scene";
import {vec4} from "../../math";
import {Plane} from "./Plane";
import {Line} from "./Line";

export class Box extends IShape {
    private model: IShape[] = [];

    constructor(scene: Scene, mins: vec4, maxs: vec4) {
        super(scene);

        this.model.push(new Plane(scene,
            new vec4(mins.x, mins.y, mins.z),
            new vec4(maxs.x, mins.y, mins.z),
            new vec4(maxs.x, mins.y, maxs.z),
            new vec4(mins.x, mins.y, maxs.z),
        ));

        this.model.push(new Plane(scene,
            new vec4(mins.x, maxs.y, mins.z),
            new vec4(maxs.x, maxs.y, mins.z),
            new vec4(maxs.x, maxs.y, maxs.z),
            new vec4(mins.x, maxs.y, maxs.z),
        ));

        this.model.push(new Line(scene,
            new vec4(mins.x, mins.y, mins.z),
            new vec4(mins.x, maxs.y, mins.z),
        ));

        this.model.push(new Line(scene,
            new vec4(maxs.x, mins.y, mins.z),
            new vec4(maxs.x, maxs.y, mins.z),
        ));

        this.model.push(new Line(scene,
            new vec4(maxs.x, mins.y, maxs.z),
            new vec4(maxs.x, maxs.y, maxs.z),
        ));

        this.model.push(new Line(scene,
            new vec4(mins.x, mins.y, maxs.z),
            new vec4(mins.x, maxs.y, maxs.z),
        ));
    }

    Move(vec: vec4) {
    }

    Render(): void {
        this.model.forEach(plane => {
            plane.Render();
        });
    }

    Rotate(vec: vec4) {
    }

    Scale(vec: vec4) {
    }

    IsVisible(): boolean {
        return true;
    }
}