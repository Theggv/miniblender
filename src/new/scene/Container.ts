import {Scene} from "./Scene";
import {IShape} from "../shape";

export class Container {
    private scene: Scene;

    public readonly Shapes: IShape[] = [];

    constructor(scene: Scene) {
        this.scene = scene;
    }

    render(): void {
        this.scene.Renderer.clear();
        this.Shapes.forEach(shape => {
            shape.Render();
        });
    }
}