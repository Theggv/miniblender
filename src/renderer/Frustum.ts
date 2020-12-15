import {plane} from "../math/plane";
import {mat4, vec4, vec3} from "../math";

export class Frustum {
    private static instance: Frustum;

    private planes: plane[];

    get Planes(): plane[] {
        return this.planes;
    }

    static get Instance(): Frustum {
        if(!Frustum.instance)
            Frustum.instance = new Frustum();

        return Frustum.instance;
    }

    private constructor() {
        this.planes = [];
    }

    recalculate(view: mat4, proj: mat4) {
        this.planes = [];

        let clip = view.mul(proj);
        // clip.debug('Matrix:');

        // right
        this.planes.push(new plane(this.normalize(
            clip.m[3] - clip.m[0],
            clip.m[7] - clip.m[4],
            clip.m[11] - clip.m[8],
            clip.m[15] - clip.m[12]
        )));

        // left
        this.planes.push(new plane(this.normalize(
            clip.m[3] + clip.m[0],
            clip.m[7] + clip.m[4],
            clip.m[11] + clip.m[8],
            clip.m[15] + clip.m[12]
        )));

        // bottom
        this.planes.push(new plane(this.normalize(
            clip.m[3] + clip.m[1],
            clip.m[7] + clip.m[5],
            clip.m[11] + clip.m[9],
            clip.m[15] + clip.m[13]
        )));

        // top
        this.planes.push(new plane(this.normalize(
            clip.m[3] - clip.m[1],
            clip.m[7] - clip.m[5],
            clip.m[11] - clip.m[9],
            clip.m[15] - clip.m[13]
        )));

        // back
        this.planes.push(new plane(this.normalize(
            clip.m[3] - clip.m[2],
            clip.m[7] - clip.m[6],
            clip.m[11] - clip.m[10],
            clip.m[15] - clip.m[14]
        )));

        // front
        this.planes.push(new plane(this.normalize(
            clip.m[3] + clip.m[2],
            clip.m[7] + clip.m[6],
            clip.m[11] + clip.m[10],
            clip.m[15] + clip.m[14]
        )));

        for (let plane of this.planes) {
            // console.log(plane);
        }
    }

    IsPointInside(point: vec3): boolean {
        let eps = 0.00001;

        for (let plane of this.planes) {
            if(plane.a * point.x + plane.b * point.y + plane.c * point.z + plane.d < -eps)
                return false;
        }

        return true;
    }

    private normalize(a: number, b: number, c: number, d: number): vec4 {

        let len = new vec3(a, b, c).length();

        return new vec4(a / len, b / len, c / len, d / len);
    }
}

export enum Side {
    Right,
    Left,
    Bottom,
    Top,
    Back,
    Front,
}