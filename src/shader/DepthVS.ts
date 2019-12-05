import {mat4, vec3, vec4} from "../math";

export class DepthVS {
    private static matrix: mat4;
    private static viewproj: mat4;

    static ViewMatrix: mat4;
    static Projection: mat4;
    static Viewport: mat4;
    static InverseViewport: mat4;

    get ViewProj(): mat4 {
        return DepthVS.viewproj;
    }

    static CalculateMatrix() {
        this.viewproj = this.ViewMatrix
            .mul(this.Projection)

        this.matrix = this.viewproj
            .mul(this.Viewport)
    }

    static Transform(vec: vec4): vec4 {
        return vec4.mulVecMat(vec, this.viewproj).normalize3();
    }

    static LinearDepthTest(depth: number): number {
         return depth * 2.0 - 1.0;
    }
}