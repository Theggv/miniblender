import {Vector2D} from "../math/Vector2D";
import {Matrix2D} from "../math/Matrix2D";

export class Camera {
    private position: Vector2D;
    private zoom: number;

    constructor(pos: Vector2D) {
        this.position = pos;
        this.zoom = 1;
    }

    get Zoom(): number {
        return this.zoom;
    }
    get Position(): Vector2D {
        return this.position;
    }


    public plusZoom(): void {
        if(this.zoom < 4)
            this.zoom *= 2;
    }
    public minusZoom(): void {
        if(this.zoom > 0.25)
            this.zoom /= 2;
    }

    public move(offset: Vector2D) {
        this.position = Matrix2D.mul_vector(this.position, Matrix2D.transfertMatrix(offset.X, offset.Y));
    }
}