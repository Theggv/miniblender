import {Scene} from "./Scene";
import {Vector2D} from "../math/Vector2D";

export class Cursor {
    private scene: Scene;

    private worldCurrentPos: Vector2D = new Vector2D(0, 0, 1);
    private localCurrentPos: Vector2D = new Vector2D(0, 0, 1);

    private worldClickPos: Vector2D = new Vector2D(0, 0, 1);
    private localClickPos: Vector2D = new Vector2D(0, 0, 1);

    constructor(scene: Scene) {
        this.scene = scene;
    }

    get WorldCurrentPos(): Vector2D {
        return this.worldCurrentPos;
    }

    get LocalCurrentPos(): Vector2D {
        return this.localCurrentPos;
    }

    get WorldClickPos(): Vector2D {
        return this.worldClickPos;
    }

    get LocalClickPos(): Vector2D {
        return this.localClickPos;
    }

    public update(x: number, y: number) {
        this.localCurrentPos.X = x;
        this.localCurrentPos.Y = y;

        this.worldCurrentPos = this.scene.posFromLocalToWorld(
            this.scene.Renderer.convertFromCanvasToCenterCoords(
                new Vector2D(x, y, 1)
            )
        );
    }

    public click(x: number, y: number) {
        this.localClickPos.X = x;
        this.localClickPos.Y = y;

        this.worldClickPos = this.scene.posFromLocalToWorld(
            this.scene.Renderer.convertFromCanvasToCenterCoords(
                new Vector2D(x, y, 1)
            )
        );
    }
}
