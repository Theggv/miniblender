import {mat4, vec3, vec4} from "../math";

export class DepthVS {
    private static matrix: mat4;

    static ViewMatrix: mat4;
    static Projection: mat4;
    static Viewport: mat4;

    static CalculateMatrix() {
        this.matrix = this.ViewMatrix
            .mul(this.Projection)
            .mul(this.Viewport)
    }

    static Transform(vec: vec4): vec4 {
        return vec4.mulVecMat(vec, this.matrix).normalize3();
    }

    static LinearDepthTest(depth: number): number {
        let z = depth * 2.0 - 1.0;
        let near = 1;
        let far = 10;
        return (2.0 * near * far) / (far + near - z * (far - near));
    }
}