export class vec2 {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static plus(a: vec2, b: vec2): vec2 {
        return new vec2(a.x + b.x, a.y + b.y);
    }

    static minus(a: vec2, b: vec2): vec2 {
        return new vec2(a.x - b.x, a.y - b.y);
    }

    static mulScalar(a: vec2, num: number): vec2 {
        return new vec2(a.x * num, a.y * num);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    reverse(): vec2 {
        return new vec2(-this.x, -this.y);
    }

    normalize(): vec2 {
        return new vec2(
            this.x / this.length(),
            this.y / this.length());
    }
}