import {IShape} from "../IShape";
import {vec4} from "../../math";
import {Vertex} from "./Vertex";
import {Scene} from "../../scene/Scene";

export class Line extends IShape {
    private m: number;
    private n: number;
    private p: number;

    private readonly _from: Vertex;
    private readonly _to: Vertex;

    public Color: string;
    public Width: number;

    constructor(scene: Scene, from: vec4, to: vec4, color: string = 'black', width: number = 3) {
        super(scene);

        this._from = new Vertex(scene, from);
        this._to = new Vertex(scene, to);

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
        let isFromInside = this._from.IsInsideView();
        let isToInside = this._to.IsInsideView();

        if (isFromInside && isToInside) {
            this.scene.Renderer.drawLine(
                this._from.ToView(), this._to.ToView(), this.Color, this.Width
            )
        }
        else if(isFromInside) {

        }
        else if(isToInside) {

        }
    }

    IsInsideView(): boolean {
        return this._from.IsInsideView() && this._to.IsInsideView();
    }

    CalcLineEquation(): void {
        this.m = this._from.X - this._to.X;
        this.n = this._from.Y - this._to.Y;
        this.p = this._from.Z - this._to.Z;
    }
}