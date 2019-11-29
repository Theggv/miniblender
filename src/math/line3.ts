import {vec3} from "./vec3";

export class line3 {
    point: vec3;
    args: vec3;

    constructor(args: vec3, point: vec3) {
        this.point = point;
        this.args = args;
    }

    distToPoint(point: vec3) {
        let vec = vec3.minus(point, this.point);

        return vec3.cross(vec, this.args).length() / this.args.length();
    }
}