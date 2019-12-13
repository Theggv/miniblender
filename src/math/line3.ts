import {vec3} from "./vec3";
import {mat3} from "./mat3";

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

    distToPoint(point: vec3): number {
        let vec = vec3.minus(point, this.point);

        return vec3.cross(vec, this.vec).length() / this.vec.length();
    }

    distToLine(from: vec3, to: vec3): number {
        let minDist = Number.MAX_VALUE;
        let temp;
        const numIterations = 100;

        let dx = (-from.x + to.x) / numIterations;
        let dy = (-from.y + to.y) / numIterations;
        let dz = (-from.z + to.z) / numIterations;

        for (let i = 0; i < numIterations; ++i) {
            temp = this.distToPoint(new vec3(
                from.x + dx * i,
                from.y + dy * i,
                from.z + dz * i));

            if(temp < minDist)
                minDist = temp;
        }

        return minDist;
    }
}