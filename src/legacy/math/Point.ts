import {Vector2D} from "./Vector2D";

export class Point extends Vector2D {
    constructor(x: number, y: number) {
        super(x, y, 1);
    }

    public isValid(): boolean {
        return !(isNaN(this.X) || isNaN(this.Y));
    }

    public isPointInRadius(point: Vector2D, radius: number) {
        let dist = Math.pow(this.X - point.X, 2) + Math.pow(this.Y - point.Y, 2);
        // console.log('dist = ' + dist);

        return dist <= Math.pow(radius, 2);
    }

    static generatePoint(w: Number, h: Number): Point {
        return new Point(
            Point.generateNum(0, w),
            Point.generateNum(0, h));
    }

    static generateNum(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static invalidPoint(): Point {
        return new Point(NaN, NaN);
    }
}