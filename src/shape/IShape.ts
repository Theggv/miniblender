import {vec4} from "../math";
import {Scene} from "../scene/Scene";

export abstract class IShape {
    private static _id: number = 0;

    readonly id: number;

    protected scene: Scene;
    protected parent: IShape;
    protected readonly children: Set<IShape>;

    protected isEditMode: boolean;
    protected hasChanges: boolean;

    get HasChanges(): boolean {
        return this.hasChanges;
    }

    set HasChanges(value: boolean) {
        this.hasChanges = value;
    }

    get IsEditMode(): boolean {
        return this.isEditMode;
    }

    set IsEditMode(value: boolean) {
        this.isEditMode = value;
    }

    get Parent(): IShape {
        return this.parent;
    }

    set Parent(value: IShape) {
        this.parent = value;
    }

    get Children(): Set<IShape> {
        return this.children;
    }

    constructor(scene: Scene) {
        this.scene = scene;
        this.id = IShape._id++;

        this.children = new Set<IShape>();
    }

    abstract Move(vec: vec4);

    abstract Rotate(vec: vec4);

    abstract Scale(vec: vec4);

    abstract Render(): void;

    abstract IsVisible(): boolean;
}