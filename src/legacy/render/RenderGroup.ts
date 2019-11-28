import {RenderShape} from "./RenderShape";
import {Point} from "../math/Point";
import {Scene} from "../scene/Scene";

export class RenderGroup extends RenderShape {
    private readonly members: Set<RenderShape>;

    constructor() {
        super();

        this.members = new Set<RenderShape>();
    }

    get Members(): Set<RenderShape> {
        return this.members;
    }

    GetCollideShape(point: Point, scene: Scene): RenderShape {
        // let shape = null;
        //
        // this.members.forEach(value => {
        //     if (shape)
        //         return;
        //
        //     if(!value.IsCollide(point))
        //         return;
        //
        //     shape = value.GetCollideShape(point);
        // });
        //
        // return shape;

        return this;
    }

    IsCollide(point: Point, scene: Scene): boolean {
        let isCollide = false;

        this.members.forEach(value => {
            if (isCollide)
                return;

            if (value.IsCollide(point, scene))
                isCollide = true;
        });

        return isCollide;
    }

    Move(point: Point): void {
        this.members.forEach(shape => {
            shape.Move(point);
        });
    }

    Render(scene: Scene): void {
        this.members.forEach(value => {
            value.Render(scene);
        })
    }

    SetSelection(s: boolean): void {
        super.SetSelection(s);

        this.members.forEach(shape => {
            shape.SetSelection(s);
        });
    }

    Info(scene: Scene): string {
        return "";
    }
}