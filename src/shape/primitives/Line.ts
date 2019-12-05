import {IShape} from "../IShape";
import {vec3, vec4} from "../../math";
import {Vertex} from "./Vertex";
import {Scene} from "../../scene/Scene";
import {Frustum} from "../../renderer/Frustum";
import {Renderer} from "../../renderer/Renderer";
import {line3} from "../../math/line3";
import {DepthVS} from "../../shader/DepthVS";

export class Line extends IShape {
    private readonly from: Vertex;
    private readonly to: Vertex;

    public Color: string;
    public Width: number;

    constructor(scene: Scene, from: vec4, to: vec4, color: string = 'black', width: number = 3) {
        super(scene);

        this.from = new Vertex(scene, from);
        this.to = new Vertex(scene, to);

        this.Color = color;
        this.Width = width;
    }

    Move(vec: vec4) {
    }

    Rotate(vec: vec4) {
    }

    Scale(vec: vec4) {
    }

    Render(): void {
        let isFromVisible = this.from.IsVisible();
        let isToVisible = this.to.IsVisible();

        if (isFromVisible && isToVisible) {
            this.scene.Renderer.drawLine(
                this.from.ToView(), this.to.ToView(),
                this.Color, this.Width
            );

            return;
        }

        let line = line3.fromTwoPoints(this.from.Point, this.to.Point);

        let intersections: vec3[] = [];

        for (let plane of Frustum.Instance.Planes) {
            let inter = plane.lineIntersection(line);

            if (inter && Frustum.Instance.IsPointInside(inter))
                intersections.push(inter);
        }

        if (intersections.length != 2)
            return;

        if (!isFromVisible && !isToVisible) {
            let start = intersections[0];
            let end = intersections[1];

            if (!this.isInsideLine(this.from.Point, this.to.Point, start) ||
                !this.isInsideLine(this.from.Point, this.to.Point, end))
                return;

            this.scene.Renderer.drawLine(
                DepthVS.Transform(new vec4(start.x, start.y, start.z)),
                DepthVS.Transform(new vec4(end.x, end.y, end.z)),
                this.Color, this.Width
            );

        } else if (isFromVisible) {
            let d1 = vec3.minus(this.to.Point, intersections[0]).length();
            let d2 = vec3.minus(this.to.Point, intersections[1]).length();

            let to = (d1 < d2) ? intersections[0] : intersections[1];

            this.scene.Renderer.drawLine(
                this.from.ToView(),
                DepthVS.Transform(new vec4(to.x, to.y, to.z)),
                this.Color, this.Width
            );

        } else if (isToVisible) {
            let d1 = vec3.minus(this.from.Point, intersections[0]).length();
            let d2 = vec3.minus(this.from.Point, intersections[1]).length();

            let from = (d1 < d2) ? intersections[0] : intersections[1];

            this.scene.Renderer.drawLine(
                this.to.ToView(),
                DepthVS.Transform(new vec4(from.x, from.y, from.z)),
                this.Color, this.Width
            );
        }
    }

    IsVisible(): boolean {
        return true;
    }

    private isInsideLine(from: vec3, to: vec3, point: vec3): boolean {
        let min = new vec3(Math.min(from.x, to.x), Math.min(from.y, to.y), Math.min(from.z, to.z));
        let max = new vec3(Math.max(from.x, to.x), Math.max(from.y, to.y), Math.max(from.z, to.z));

        if(point.x < min.x || point.x > max.x)
            return false;

        if(point.y < min.y || point.y > max.y)
            return false;

        if(point.z < min.z || point.z > max.z)
            return false;

        return true;
    }
}