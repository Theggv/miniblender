import {Vector2D} from "../math/Vector2D";

export class Renderer {
    private readonly buffer: HTMLCanvasElement[] = [];
    private readonly ctx: CanvasRenderingContext2D[] = [];

    constructor(canvas: HTMLCanvasElement, buffer: HTMLCanvasElement) {
        this.buffer.push(canvas);
        this.buffer.push(buffer);

        this.ctx.push(this.buffer[0].getContext('2d'));
        this.ctx.push(this.buffer[1].getContext('2d'));

        this.initCanvas();
    }

    get Width(): number {
        return this.buffer[0].width;
    }
    get Height(): number {
        return this.buffer[0].height;
    }

    get Left(): number {
        return -this.Width / 2;
    }
    get Right(): number {
        return this.Width / 2;
    }
    get Top(): number {
        return this.Height / 2;
    }
    get Bottom(): number {
        return -this.Height / 2;
    }

    get Size(): Vector2D {
        return new Vector2D(this.Width, this.Height, 1);
    }

    get Element(): HTMLCanvasElement {
        return this.buffer[0];
    }

    get Context(): CanvasRenderingContext2D {
        return this.ctx[1];
    }

    public Clear(): void {
        this.ctx[0].clearRect(0, 0, this.buffer[0].width, this.buffer[0].height);
        this.ctx[1].clearRect(0, 0, this.buffer[1].width, this.buffer[1].height);
    }

    public Draw(): void {
        this.ctx[0].drawImage(this.buffer[1], 0, 0);
        this.ctx[1].clearRect(0, 0, this.buffer[1].width, this.buffer[1].height);
    }

    public convertFromCanvasToCenterCoords(point: Vector2D): Vector2D {
        return new Vector2D(
            point.X - this.Width / 2,
            point.Y - this.Height / 2,
            1);
    }

    public convertFromCenterToCanvasCoords(point: Vector2D): Vector2D {
        return new Vector2D(
            point.X + this.Width / 2,
            point.Y + this.Height / 2,
            1);
    }

    private initCanvas() {
        this.buffer[0].width = this.buffer[0].offsetWidth;
        this.buffer[0].height = this.buffer[0].offsetHeight;

        this.buffer[1].width = this.buffer[0].width;
        this.buffer[1].height = this.buffer[0].height;
    }
}