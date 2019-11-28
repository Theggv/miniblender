import {RenderShape} from "./RenderShape";
import {LineSegment} from "../math/LineSegment";
import {RenderPoint} from "./RenderPoint";
import {Point} from "../math/Point";
import {Scene} from "../scene/Scene";
import {Vector2D} from "../math/Vector2D";
import {Line} from "../math/Line";

export class RenderLine extends RenderShape {
    private model: LineSegment;
    private points: RenderPoint[] = [];
    private readonly collideDistance = 7;

    constructor(line: LineSegment) {
        super();

        this.model = line;

        this.points.push(new RenderPoint(line.Start));
        this.points.push(new RenderPoint(line.End));

        this.points.forEach(point => {
            point.Parent = this;
        });
    }

    Render(scene: Scene): void {
        // render line
        if (this.IsSelected) {
            scene.drawLine(
                this.points[0].Model,
                this.points[1].Model,
                3,
                'green'
            );
        } else {
            scene.drawLine(
                this.points[0].Model,
                this.points[1].Model,
                2,
                'black'
            );
        }

        // render points
        for (let point of this.points) {
            point.Render(scene);
        }
    }

    IsCollide(point: Vector2D, scene: Scene): boolean {
        return this.model.isCollide(point, scene.recalcTriggerDistance(
            this.collideDistance));
    }

    SetSelection(s: boolean): void {
        super.SetSelection(s);

        if(!s) {
            for (let point of this.points) {
                point.SetSelection(s);
            }
        }
    }

    Move(point: Point): void {
        for (let _point of this.points) {
            _point.Move(point);
        }
    }

    GetCollideShape(point: Point, scene: Scene): RenderShape {
        for (let _point of this.points) {
            if(_point.IsCollide(point, scene))
                return _point;
        }
        return this;
    }

    Info(scene: Scene): string {
        let line = Line.fromPoints(this.model.Start, this.model.End);
        return "Уравнение прямой: " +
            '( ' +
            line.a.toFixed(1) + ' , ' +
            line.b.toFixed(1) + ' , ' +
            line.c.toFixed(1) + ' )';
    }
}