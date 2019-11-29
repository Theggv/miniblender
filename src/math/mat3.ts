export class mat3 {
    readonly m: Array<number>;

    constructor(matrix: Array<number>) {
        this.m = matrix;
    }

    determinant(): number{
        return mat3.determinant(this);
    }

    static determinant(mat: mat3): number {
        return mat.m[0] * mat.m[4] * mat.m[8] +
            mat.m[2] * mat.m[3] * mat.m[7] +
            mat.m[1] * mat.m[5] * mat.m[6] -
            mat.m[2] * mat.m[4] * mat.m[6] -
            mat.m[0] * mat.m[5] * mat.m[7] -
            mat.m[1] * mat.m[3] * mat.m[8];
    }
}