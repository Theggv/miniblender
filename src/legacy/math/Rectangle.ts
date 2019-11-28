import {Point} from "./Point";

export class Rectangle {
    private left: number;
    private top: number;
    private width: number;
    private height: number;

    constructor(pos: Point, size: Point) {
        this.left = pos.X;
        this.top = pos.Y;
        this.width = size.X;
        this.height = size.Y;
    }

    get Left(): number {
        return this.left;
    }

    get Top(): number {
        return  this.top;
    }

    get Right(): number {
        return this.left + this.width;
    }

    get Bottom(): number {
        return this.top + this.height;
    }

    public Contains(box: Rectangle): boolean {
        return  this.Left <= box.Left &&
                this.Top <= box.Top &&
                box.Bottom <= this.Bottom &&
                box.Right <= this.Right;
    }

    public IsCollide(box: Rectangle): boolean {
        return  this.Left < box.Right &&
                this.Right > box.Left &&
                this.Top < box.Bottom &&
                this.Bottom > box.Top;
    }
}