import {Point} from "./Point";

export class Vector2D {
    private x: number;
    private y: number;
    private n: number;

    constructor(x: number, y: number, n: number) {
        this.x = x;
        this.y = y;
        this.n = n;
    }

    get X(): number{
        return this.x;
    }
    get Y(): number{
        return this.y;
    }
    get N(): number{
        return this.n;
    }

    set X(num: number) {
        this.x = num;
    }
    set Y(num: number) {
        this.y = num;
    }
    set N(num: number) {
        this.n = num;
    }

    get IsNormalized(): boolean {
        return this.n === 1;
    }

    public normalize(): Vector2D {
        if(this.IsNormalized)
            return this;

        if(!this.n)
            return this;

        this.x /= this.n;
        this.y /= this.n;
        this.n = 1;

        return this;
    }

    public static normalize(vec: Vector2D): Vector2D {
        return vec.normalize();
    }

    public static matrixMult(v1: Vector2D, v2: Vector2D): Vector2D {
        let x = v1.y * v2.n - v1.n * v2.y;
        let y = v1.n * v2.x - v1.x * v2.n;
        let n = v1.x * v2.y - v1.y * v2.x;

        let vec = new Vector2D(x, y, n);

        return vec.normalize();
    }

    public static scalarMult(v1: Vector2D, v2: Vector2D): number {
        let a = v1.normalize();
        let b = v2.normalize();

        return a.x * b.x + a.y * b.y;
    }
}