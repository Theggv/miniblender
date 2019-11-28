import {Point} from "./Point";
import {Vector2D} from "./Vector2D";

export class Line {
    a: number;
    b: number;
    c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    normalize(): void {
        let max = Math.max(Math.abs(this.a), Math.abs(this.b), Math.abs(this.c));

        this.a /= max;
        this.b /= max;
        this.c /= max;
    }

    normalVector(): Point {
        return new Point(this.b, -this.a);
    }

    // sin between l1 and l2
    static sin(l1: Line, l2: Line): number {
        return (l1.a * l2.b - l2.a * l1.b) / (l1.length() * l2.length());
    }

    // cos between l1 and l2
    static cos(l1: Line, l2: Line): number {
        return (l1.a * l2.a + l1.b * l2.b) / (l1.length() * l2.length());
    }

    // tg between l1 and l2
    static tg(l1: Line, l2: Line): number {
        if(!Line.cos(l1, l2))
            return NaN;

        return (l1.a * l2.b - l2.a * l1.b) / (l1.a * l2.a + l1.b * l2.b);
    }

    // vector length
    length(): number {
        return Math.sqrt(this.a * this.a + this.b * this.b);
    }

    static fromPoints(start: Vector2D, end: Vector2D): Line {
        return new Line(
            start.Y - end.Y,
            end.X - start.X,
            start.X * end.Y - end.X * start.Y);
    }

    static fromVectorAndPoint(vec: Vector2D, point: Vector2D): Line {
        return new Line(
            vec.X,
            vec.Y,
            -vec.X * point.X - vec.Y * point.Y);
    }

    // intersection point between two lines
    static intersection(line1: Line, line2: Line): Point {
        let a = line1.b * line2.c - line2.b * line1.c;
        let b = line2.a * line1.c - line1.a * line2.c;
        let c = line1.a * line2.b - line2.a * line1.b;

        return c ? new Point(a / c, b / c) : Point.invalidPoint();
    }
}