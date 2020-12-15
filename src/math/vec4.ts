import {vec3} from "./vec3";
import {mat4} from "./mat4";

export class vec4 extends vec3 {
    w: number;

    get IsNormalized(): boolean {
        return this.w == 1;
    }

    constructor(x = 0, y = 0, z = 0, w = 1) {
        super(x, y, z);
        this.w = w;
    }

    plus(vec: vec4): vec4 {
        return vec4.plus(this, vec);
    }

    static plus(a: vec4, b: vec4): vec4 {
        return new vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w - b.w);
    }

    minus(vec: vec4): vec4 {
        return vec4.minus(this, vec);
    }

    static minus(a: vec4, b: vec4): vec4 {
        return new vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    mulScalar(num: number): vec4 {
        return vec4.mulScalar(this, num);
    }

    static mulScalar(a: vec4, num: number): vec4 {
        return new vec4(a.x * num, a.y * num, a.z * num, a.w * num);
    }

    mulVecMat(mat: mat4): vec4 {
        return vec4.mulVecMat(this, mat);
    }

    static mulVecMat(vec: vec4, mat: mat4): vec4 {
        return new vec4(
            vec.x * mat.m[0] + vec.y * mat.m[4] + vec.z * mat.m[8] + vec.w * mat.m[12],
            vec.x * mat.m[1] + vec.y * mat.m[5] + vec.z * mat.m[9] + vec.w * mat.m[13],
            vec.x * mat.m[2] + vec.y * mat.m[6] + vec.z * mat.m[10] + vec.w * mat.m[14],
            vec.x * mat.m[3] + vec.y * mat.m[7] + vec.z * mat.m[11] + vec.w * mat.m[15],
        );
    }

    length(): number {
        return Math.sqrt(vec4.dot(this, this));
    }

    reverse(): vec4 {
        return new vec4(-this.x, -this.y, -this.z, -this.w);
    }

    normalize3(): vec4 {
        return new vec4(this.x / this.w, this.y / this.w, this.z / this.w, 1);
    }

    normalize(): vec4 {
        let len = this.length();

        if (!len)
            return this;

        this.x /= len;
        this.y /= len;
        this.z /= len;
        this.w /= len;

        return this;
    }

    dot(b: vec4): number {
        return vec4.dot(this, b);
    }

    static dot(a: vec4, b: vec4): number {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    debug(message: string = undefined): void {
        vec4.debug(this, message);
    }

    static debug(vec: vec4, message: string = undefined): void {
        if (message)
            console.log(message);

        // console.log(
        //     vec.x.toFixed(3) + '\t' +
        //     vec.y.toFixed(3) + '\t' +
        //     vec.z.toFixed(3) + '\t' +
        //     vec.w.toFixed(3));
    }
}