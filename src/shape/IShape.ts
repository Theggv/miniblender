import {mat4, vec3, vec4} from "../math";
import {Scene} from "../scene/Scene";
import {line3} from "../math/line3";

export abstract class IShape {
    private static _id: number = 0;

    readonly id: number;

    protected scene: Scene;
    protected parent: IShape;
    protected readonly children: Set<IShape>;

    protected isEditMode: boolean;
    protected hasChanges: boolean;
    protected isSelected: boolean;

    get IsSelected(): boolean {
        return this.isSelected;
    }

    set IsSelected(value: boolean) {
        this.isSelected = value;
    }

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

    abstract Move(vec: vec3);

    abstract Rotate(vec: vec3, point: vec3);

    abstract Scale(vec: vec3);

    abstract Render(): void;

    abstract IsVisible(): boolean;

    abstract MulMatrix(mat: mat4): void;

    /**
     * If collide returns distance to the shape, -1 otherwise.
     * @param ray
     * @constructor
     */
    abstract IsCollide(ray: line3): number;
}