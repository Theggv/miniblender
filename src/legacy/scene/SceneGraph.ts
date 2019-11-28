import {RenderShape} from "../render/RenderShape";
import {Scene} from "./Scene";

export class SceneGraph {
    private readonly scene: Scene;
    private readonly shapes: Set<RenderShape>;
    private readonly selectedShapes: Set<RenderShape>;

    constructor(scene: Scene) {
        this.scene = scene;
        this.shapes = new Set<RenderShape>();
        this.selectedShapes = new Set<RenderShape>();
    }

    get Shapes(): Set<RenderShape> {
        return this.shapes;
    }

    get SelectedShapes(): Set<RenderShape> {
        return this.selectedShapes;
    }

    public render(): void {
        this.shapes.forEach(shape => {
            shape.Render(this.scene);
        });
    }
}