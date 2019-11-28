import {vec2} from "./vec2";

export class vec3 extends vec2 {
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }

    static plus(a: vec3, b: vec3): vec3 {
        return new vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static minus(a: vec3, b: vec3): vec3 {
        return new vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static mulScalar(a: vec3, num: number): vec3 {
        return new vec3(a.x * num, a.y * num, a.z * num);
    }

    length(): number {
        return Math.sqrt(vec3.dot(this, this));
    }

    reverse(): vec3 {
        return new vec3(-this.x, -this.y, -this.z);
    }

    normalize(): vec3 {
        let len = this.length();

        return new vec3(
            this.x / len,
            this.y / len,
            this.z / len);
    }

    static cross(a: vec3, b: vec3): vec3 {
        return new vec3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
            );
    }

    static dot(a: vec3, b: vec3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static debug(vec: vec3): void {
        console.log(vec.x + '\t' + vec.y + '\t' + vec.z);
    }
}