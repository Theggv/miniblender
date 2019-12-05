import {vec4} from "./vec4";
import {vec3} from "./vec3";
import {line3} from "./line3";

export class plane {
    a: number;
    b: number;
    c: number;
    d: number;

    constructor(vec: vec4) {
        this.a = vec.x;
        this.b = vec.y;
        this.c = vec.z;
        this.d = vec.w;
    }

    static fromLineAndPoint(line: line3, point: vec3): plane {
        let p12 = line.vec;
        let p13 = vec3.minus(line.point, point);

        let n = new vec3(
            p12.y * p13.z - p13.y * p12.z,
            p12.z * p13.x - p13.z * p12.x,
            p12.x * p13.y - p13.x * p12.y
        );

        return new plane(new vec4(
            n.x,
            n.y,
            n.z,
            -n.x * point.x - n.y * point.y - n.z * point.z
        ));
    }

    static fromThreePoints(p1: vec3, p2: vec3, p3: vec3): plane {
        let line = line3.fromTwoPoints(p1, p2);

        return plane.fromLineAndPoint(line, p3);
    }

    lineIntersection(line: line3): vec3 {
        return plane.lineIntersection(this, line);
    }

    static lineIntersection(plane: plane, line: line3): vec3 {
        let t = (-plane.a * line.point.x - plane.b * line.point.y - plane.c * line.point.z - plane.d) /
            (plane.a * line.vec.x + plane.b * line.vec.y + plane.c * line.vec.z);

        if(t == -Infinity || t == Infinity || t == NaN)
            return undefined;

        return new vec3(
            line.vec.x * t + line.point.x,
            line.vec.y * t + line.point.y,
            line.vec.z * t + line.point.z);
    }
}