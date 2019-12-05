import {vec3} from "./vec3";

export class line3 {
    point: vec3;
    vec: vec3;

    constructor(args: vec3, point: vec3) {
        this.point = point;
        this.vec = args;
    }

    static fromTwoPoints(p1: vec3, p2: vec3): line3 {
        return new line3(vec3.minus(p2, p1), p1);
    }

    distToPoint(point: vec3) {
        let vec = vec3.minus(point, this.point);

        return vec3.cross(vec, this.vec).length() / this.vec.length();
    }
}