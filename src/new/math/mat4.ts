import {vec3} from "./vec3";
import {vec4} from "./vec4";
import {radians} from "./index";

export class mat4 {
    readonly m: Array<number>;

    constructor(matrix: Array<number>) {
        this.m = matrix;
    }

    static transfert(vec: vec3): mat4 {
        return new mat4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            vec.x, vec.y, vec.z, 1
        ]);
    }

    static rotateX(a: number): mat4 {
        return new mat4([
            1, 0, 0, 0,
            0, Math.cos(a), Math.sin(a), 0,
            0, -Math.sin(a), Math.cos(a), 0,
            0, 0, 0, 1
        ]);
    }

    static rotateY(a: number): mat4 {
        return new mat4([
            Math.cos(a), 0, -Math.sin(a), 0,
            0, 1, 0, 0,
            Math.sin(a), 0, Math.cos(a), 0,
            0, 0, 0, 1
        ]);
    }

    static rotateZ(a: number): mat4 {
        return new mat4([
            Math.cos(a), Math.sin(a), 0, 0,
            -Math.sin(a), Math.cos(a), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static scale(vec: vec3) {
        return new mat4([
            vec.x, 0, 0, 0,
            0, vec.y, 0, 0,
            0, 0, vec.z, 0,
            0, 0, 0, 1
        ]);
    }

    mul(b: mat4): mat4 {
        return new mat4([
            this.m[0] * b.m[0] + this.m[1] * b.m[4] + this.m[2] * b.m[8] + this.m[3] * b.m[12],
            this.m[0] * b.m[1] + this.m[1] * b.m[5] + this.m[2] * b.m[9] + this.m[3] * b.m[13],
            this.m[0] * b.m[2] + this.m[1] * b.m[6] + this.m[2] * b.m[10] + this.m[3] * b.m[14],
            this.m[0] * b.m[3] + this.m[1] * b.m[7] + this.m[2] * b.m[11] + this.m[3] * b.m[15],

            this.m[4] * b.m[0] + this.m[5] * b.m[4] + this.m[6] * b.m[8] + this.m[7] * b.m[12],
            this.m[4] * b.m[1] + this.m[5] * b.m[5] + this.m[6] * b.m[9] + this.m[7] * b.m[13],
            this.m[4] * b.m[2] + this.m[5] * b.m[6] + this.m[6] * b.m[10] + this.m[7] * b.m[14],
            this.m[4] * b.m[3] + this.m[5] * b.m[7] + this.m[6] * b.m[11] + this.m[7] * b.m[15],

            this.m[8] * b.m[0] + this.m[9] * b.m[4] + this.m[10] * b.m[8] + this.m[11] * b.m[12],
            this.m[8] * b.m[1] + this.m[9] * b.m[5] + this.m[10] * b.m[9] + this.m[11] * b.m[13],
            this.m[8] * b.m[2] + this.m[9] * b.m[6] + this.m[10] * b.m[10] + this.m[11] * b.m[14],
            this.m[8] * b.m[3] + this.m[9] * b.m[7] + this.m[10] * b.m[11] + this.m[11] * b.m[15],

            this.m[12] * b.m[0] + this.m[13] * b.m[4] + this.m[14] * b.m[8] + this.m[15] * b.m[12],
            this.m[12] * b.m[1] + this.m[13] * b.m[5] + this.m[14] * b.m[9] + this.m[15] * b.m[13],
            this.m[12] * b.m[2] + this.m[13] * b.m[6] + this.m[14] * b.m[10] + this.m[15] * b.m[14],
            this.m[12] * b.m[3] + this.m[13] * b.m[7] + this.m[14] * b.m[11] + this.m[15] * b.m[15],
        ]);
    }

    static mul(a: mat4, b: mat4): mat4 {
        return new mat4([
            a.m[0] * b.m[0] + a.m[1] * b.m[4] + a.m[2] * b.m[8] + a.m[3] * b.m[12],
            a.m[0] * b.m[1] + a.m[1] * b.m[5] + a.m[2] * b.m[9] + a.m[3] * b.m[13],
            a.m[0] * b.m[2] + a.m[1] * b.m[6] + a.m[2] * b.m[10] + a.m[3] * b.m[14],
            a.m[0] * b.m[3] + a.m[1] * b.m[7] + a.m[2] * b.m[11] + a.m[3] * b.m[15],

            a.m[4] * b.m[0] + a.m[5] * b.m[4] + a.m[6] * b.m[8] + a.m[7] * b.m[12],
            a.m[4] * b.m[1] + a.m[5] * b.m[5] + a.m[6] * b.m[9] + a.m[7] * b.m[13],
            a.m[4] * b.m[2] + a.m[5] * b.m[6] + a.m[6] * b.m[10] + a.m[7] * b.m[14],
            a.m[4] * b.m[3] + a.m[5] * b.m[7] + a.m[6] * b.m[11] + a.m[7] * b.m[15],

            a.m[8] * b.m[0] + a.m[9] * b.m[4] + a.m[10] * b.m[8] + a.m[11] * b.m[12],
            a.m[8] * b.m[1] + a.m[9] * b.m[5] + a.m[10] * b.m[9] + a.m[11] * b.m[13],
            a.m[8] * b.m[2] + a.m[9] * b.m[6] + a.m[10] * b.m[10] + a.m[11] * b.m[14],
            a.m[8] * b.m[3] + a.m[9] * b.m[7] + a.m[10] * b.m[11] + a.m[11] * b.m[15],

            a.m[12] * b.m[0] + a.m[13] * b.m[4] + a.m[14] * b.m[8] + a.m[15] * b.m[12],
            a.m[12] * b.m[1] + a.m[13] * b.m[5] + a.m[14] * b.m[9] + a.m[15] * b.m[13],
            a.m[12] * b.m[2] + a.m[13] * b.m[6] + a.m[14] * b.m[10] + a.m[15] * b.m[14],
            a.m[12] * b.m[3] + a.m[13] * b.m[7] + a.m[14] * b.m[11] + a.m[15] * b.m[15],
        ]);
    }

    mulVec(vec: vec4): vec4 {
         return new vec4(
          vec.x * this.m[0] + vec.y * this.m[4] + vec.z * this.m[8] + vec.w * this.m[12],
          vec.x * this.m[1] + vec.y * this.m[5] + vec.z * this.m[9] + vec.w * this.m[13],
          vec.x * this.m[2] + vec.y * this.m[6] + vec.z * this.m[10] + vec.w  * this.m[14],
          vec.x * this.m[3] + vec.y * this.m[7] + vec.z * this.m[11] + vec.w  * this.m[15],
        );
    }
    
    static mulVec(vec: vec4, m: mat4): vec4 {
        return new vec4(
          vec.x * m.m[0] + vec.y * m.m[4] + vec.z * m.m[8] + vec.w * m.m[12],
          vec.x * m.m[1] + vec.y * m.m[5] + vec.z * m.m[9] + vec.w * m.m[13],
          vec.x * m.m[2] + vec.y * m.m[6] + vec.z * m.m[10] + vec.w  * m.m[14],
          vec.x * m.m[3] + vec.y * m.m[7] + vec.z * m.m[11] + vec.w  * m.m[15],
        );
    }
    
    transpose(): mat4 {
        return new mat4([
           this.m[0], this.m[4], this.m[8], this.m[12],
           this.m[1], this.m[5], this.m[9], this.m[13],
           this.m[2], this.m[6], this.m[10], this.m[14],
           this.m[3], this.m[7], this.m[11], this.m[15],
        ]);
    }

    static transpose(mat: mat4): mat4 {
        return new mat4([
           mat.m[0], mat.m[4], mat.m[8], mat.m[12],
           mat.m[1], mat.m[5], mat.m[9], mat.m[13],
           mat.m[2], mat.m[5], mat.m[10], mat.m[14],
           mat.m[3], mat.m[6], mat.m[11], mat.m[15],
        ]);
    }

    static lookAt(eye: vec3, center: vec3, worldUp: vec3 = new vec3(0,1,0)): mat4 {
        let f = vec3.minus(center, eye).normalize();
        let s = vec3.cross(f, worldUp.normalize()).normalize();
        let u = vec3.cross(s, f).normalize();

        return new mat4([
            s.x, u.x, -f.x, 0,
            s.y, u.y, -f.y, 0,
            s.z, u.z, -f.z, 0,
            -vec3.dot(s, eye), -vec3.dot(u, eye), vec3.dot(f, eye), 1
        ]);
    }

    static viewPort(width, height): mat4 {
        return new mat4([
           width / 2, 0, 0, 0,
           0, -height / 2, 0, 0,
           0, 0, 1, 0,
           width / 2, height / 2, 0, 1
        ]);
    }

    static frustum(left: number, bottom: number,
                   right: number, top: number,
                   near: number, far: number): mat4 {
        return new mat4([
            2 * near / (right - left), 0, (right + left) / (right - left), 0,
            0, 2 * near / (top - bottom), (top + bottom) / (top - bottom), 0,
            0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near),
            0, 0, -1, 0
        ]).transpose();
    }

    /**
     * Tested
     * @param fov
     * @param aspect
     * @param near
     * @param far
     */
    static perspective(fov: number, aspect: number, near: number, far: number): mat4 {
        let scale = Math.tan(radians(fov / 2));
        let height = near * scale;
        let width = height * aspect;

        return mat4.frustum(-width, -height, width, height, near, far);
    }

    static ortho(near: number, far: number,
                 left: number, bottom: number,
                 right: number, top: number) {
        return new mat4([
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, -2 / (far - near), 0,
            -(right + left) / (right - left), -(top + bottom) / (top - bottom),
            - (far + near) / (far - near), 1
        ]);
    }

    static debug(mat: mat4, message: string = undefined) {
        if(message)
            console.log(message);

        console.log(mat.m[0] + '\t' + mat.m[1] + '\t' + mat.m[2] + '\t' + mat.m[3]);
        console.log(mat.m[4] + '\t' + mat.m[5] + '\t' + mat.m[6] + '\t' + mat.m[7]);
        console.log(mat.m[8] + '\t' + mat.m[9] + '\t' + mat.m[10]+ '\t' + mat.m[11]);
        console.log(mat.m[12]+ '\t' + mat.m[13]+ '\t'+ mat.m[14] + '\t' + mat.m[15]);
    }
}