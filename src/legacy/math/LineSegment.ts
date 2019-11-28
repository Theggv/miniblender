import {Line} from "./Line";
import {Point} from "./Point";
import {Vector2D} from "./Vector2D";

export class LineSegment {
    public readonly Start: Point;
    public readonly End: Point;

    constructor(start, end) {
        this.Start = start;
        this.End = end;
        // console.log(this.Start, this.End);
    }

    public projection(point: Vector2D): Point {
        let line = Line.fromPoints(this.Start, this.End);

        let normal = Line.fromVectorAndPoint(
            line.normalVector(), point);

        let inter = Line.intersection(line, normal);

        // console.log(this.Start, this.End, inter);

        if(!inter.isValid())
            return Point.invalidPoint();

        let min = Math.min(this.Start.X, this.End.X);
        let max = Math.max(this.Start.X, this.End.X);

        // console.log(min, max);

        if(inter.X >= min && inter.X <= max)
            return inter;

        return Point.invalidPoint();
    }

    public isCollide(point: Vector2D, radius: number): boolean {
        let projection = this.projection(point);

        // console.log(projection);

        if(!projection.isValid())
            return false;

        return new Point(point.X, point.Y).isPointInRadius(projection, radius);
    }

    static randomLine(w, h): LineSegment {
        return new LineSegment(
            Point.generatePoint(w, h),
            Point.generatePoint(w, h));
    }
}