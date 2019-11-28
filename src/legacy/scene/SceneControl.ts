import {LineSegment} from "../math/LineSegment";
import {RenderLine} from "../render/RenderLine";
import {Scene} from "./Scene";

export class SceneControl {
    private scene: Scene;
    private addButton: HTMLElement;
    private removeButton: HTMLElement;

    constructor(scene: Scene) {
        this.scene = scene;
        this.addButton = document.getElementById("add");
        this.removeButton = document.getElementById("remove");

        this.addButton.addEventListener('click', 	this.onAddClick.bind(this));
        this.removeButton.addEventListener('click', this.onRemoveClick.bind(this));
    }

    onAddClick() {
        let line = LineSegment.randomLine(20, 20);
        this.scene.Container.Shapes.add(new RenderLine(line));
    }

    onRemoveClick() {
        this.scene.Container.SelectedShapes.forEach(shape => {
            this.scene.Container.Shapes.delete(shape);
        });
        this.scene.Container.SelectedShapes.clear();
    }
}