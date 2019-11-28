import {Scene} from "../scene/Scene";
import {Vector2D} from "../math/Vector2D";

export abstract class RenderShape {
    private parent: RenderShape;

    public IsSelected: boolean;


    public abstract Render(scene: Scene): void;

    public abstract IsCollide(point: Vector2D, scene: Scene): boolean;

    public abstract Move(point: Vector2D): void;

    public abstract GetCollideShape(point: Vector2D, scene: Scene): RenderShape;

    public abstract Info(scene: Scene): string;


    get Parent(): RenderShape {
        return this.parent;
    }

    set Parent(shape: RenderShape) {
        this.parent = shape;
    }


    public SetSelection(s: boolean): void {
        this.IsSelected = s;
    }
}