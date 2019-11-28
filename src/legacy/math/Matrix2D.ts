import {Vector2D} from "./Vector2D";

export class Matrix2D {
    private matrix: Array<number> = new Array<number>(9);

    constructor(matrix: Array<number>) {
        this.matrix = matrix;
    }

    public static mul_matrix(m1: Matrix2D, m2: Matrix2D): Matrix2D {
        return new Matrix2D([
            m1.matrix[0] * m2.matrix[0] + m1.matrix[1] * m2.matrix[3] + m1.matrix[2] * m2.matrix[6],
            m1.matrix[0] * m2.matrix[1] + m1.matrix[1] * m2.matrix[4] + m1.matrix[2] * m2.matrix[7],
            m1.matrix[0] * m2.matrix[2] + m1.matrix[1] * m2.matrix[5] + m1.matrix[2] * m2.matrix[8],
            m1.matrix[3] * m2.matrix[0] + m1.matrix[4] * m2.matrix[3] + m1.matrix[5] * m2.matrix[6],
            m1.matrix[3] * m2.matrix[1] + m1.matrix[4] * m2.matrix[4] + m1.matrix[5] * m2.matrix[7],
            m1.matrix[3] * m2.matrix[2] + m1.matrix[4] * m2.matrix[5] + m1.matrix[5] * m2.matrix[8],
            m1.matrix[6] * m2.matrix[0] + m1.matrix[7] * m2.matrix[3] + m1.matrix[8] * m2.matrix[6],
            m1.matrix[6] * m2.matrix[1] + m1.matrix[7] * m2.matrix[4] + m1.matrix[8] * m2.matrix[7],
            m1.matrix[6] * m2.matrix[2] + m1.matrix[7] * m2.matrix[5] + m1.matrix[8] * m2.matrix[8],
        ]);
    }

    public static mul_vector(v1: Vector2D, m2: Matrix2D): Vector2D {
        return new Vector2D(
            v1.X * m2.matrix[0] + v1.Y * m2.matrix[3] + v1.N * m2.matrix[6],
            v1.X * m2.matrix[1] + v1.Y * m2.matrix[4] + v1.N * m2.matrix[7],
            v1.X * m2.matrix[2] + v1.Y * m2.matrix[5] + v1.N * m2.matrix[8],
        );
    }

    public static transfertMatrix(n: number, m: number): Matrix2D {
        return new Matrix2D([
            1, 0, 0,
            0, 1, 0,
            n, m, 1]);
    }

    public static scaleMatrix(a: number, d: number): Matrix2D {
        return new Matrix2D([
            a, 0, 0,
            0, d, 0,
            0, 0, 1]);
    }

    public static rotateMatrix(angle: number): Matrix2D {
        return new Matrix2D([
            Math.cos(angle), Math.sin(angle), 0,
            -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 1]);
    }

    public static diagonalMirrorMatrix(): Matrix2D {
        return new Matrix2D([
            0, 1, 0,
            1, 0, 0,
            0, 0, 1]);
    }

    public static horizontalMirrorMatrix(): Matrix2D {
        return new Matrix2D([
            1, 0, 0,
            0, -1, 0,
            0, 0, 1]);
    }

    public static verticalMirrorMatrix(): Matrix2D {
        return new Matrix2D([
            -1, 0, 0,
            0, 1, 0,
            0, 0, 1]);
    }

    public static projectionMatrix(p: number, q: number): Matrix2D {
        return new Matrix2D([
            1, 0, p,
            0, 1, q,
            0, 0, 1]);
    }

    public static fullScaleMatrix(s: number): Matrix2D {
        return new Matrix2D([
            1, 0, 0,
            0, 1, 0,
            0, 0, s]);
    }
}