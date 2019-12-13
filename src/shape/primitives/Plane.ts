import {IShape} from "../IShape";
import {Scene} from "../../scene/Scene";
import {mat4, vec4} from "../../math";
import {Line} from "./Line";
import {line3} from "../../math/line3";

export class Plane extends IShape {
    private model: Line[] = [];

    set IsSelected(value: boolean) {
        for (let line of this.model) {
            line.IsSelected = value;
        }
    }

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

    IsVisible(): boolean {
        return true;
    }

    MulMatrix(mat: mat4): void {
    }

    IsCollide(ray: line3): number {
        let minDist = Number.MAX_VALUE;

        for(let line of this.model) {
            let temp = line.IsCollide(ray);

            if(temp != -1 && temp < minDist)
                minDist = temp;
        }

        if(minDist == Number.MAX_VALUE)
            return -1;

        return minDist;
    }
}