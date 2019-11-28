import {RenderShape} from "./RenderShape";
import {Point} from "../math/Point";
import {Scene} from "../scene/Scene";
import {Vector2D} from "../math/Vector2D";

export class RenderPoint extends RenderShape {
    private model: Point;
    private readonly collideDistance = 7;

    constructor(point: Point) {
        super();

        this.model = point;
    }

    get Model(): Point {
        return this.model;
    }

    Render(scene: Scene): void {
        if(this.IsSelected) {
            scene.drawCircle(
                new Vector2D(this.model.X, this.model.Y, 1),
                5,
                'red'
            );
        }
        else {
            scene.drawCircle(
                new Vector2D(this.model.X, this.model.Y, 1),
                3,
                'black'
            );
        }
    }

    IsCollide(point: Vector2D, scene: Scene): boolean {
        return this.model.isPointInRadius(point, scene.recalcTriggerDistance(
            this.collideDistance));
    }

    Move(point: Vector2D): void {
        this.model.X += point.X;
        this.model.Y += point.Y;
    }

    GetCollideShape(point: Vector2D, scene: Scene): RenderShape {
        return this;
    }

    Info(scene: Scene): string {
        return 'Координаты точки: ' +
            '( ' +
            this.model.X.toFixed(1) +
            ' ; ' +
            this.model.Y.toFixed(1) +
            ' )';
    }
}