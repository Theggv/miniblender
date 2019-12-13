import {Scene} from "./Scene";
import {IShape} from "../shape";
import {vec2, vec3} from "../math";
import {line3} from "../math/line3";
import {TraceVS} from "../shader/TraceVS";

export class Container {
    private scene: Scene;

    /**
     * Объекты, с которыми нельзя взаимодействовать
     */
    public readonly StaticObjects: Set<IShape> = new Set<IShape>();

    /**
     * Объекты, с которыми можно взаимодействовать
     */
    public readonly DynamicObjects: Set<IShape> = new Set<IShape>();

    /**
     * Выделенные объекты
     */
    public readonly Selection: Set<IShape> = new Set<IShape>();

    constructor(scene: Scene) {
        this.scene = scene;

        document.getElementById('canv-main')
            .addEventListener('mousedown', (e: any) => {
                this.rayCast(new vec2(e.layerX, e.layerY));
            });
    }

    render(): void {
        this.scene.Renderer.clear();

        this.StaticObjects.forEach(shape => {
            shape.Render();
        });

        this.DynamicObjects.forEach(shape => {
            shape.Render();
        });
    }

    private rayCast(screenPos: vec2): void {
        let ray = new line3(TraceVS.trace(screenPos), this.scene.Camera.Position);

        let triggerDistance = 5;

        let nearShape: IShape = null;
        let minDist = Number.MAX_VALUE;
        let curDist;

        this.DynamicObjects.forEach(shape => {
            curDist = shape.IsCollide(ray);

            if(curDist == -1 || curDist >= minDist)
                return;

            minDist = curDist;
            nearShape = shape;
        });

        this.Selection.forEach(shape => {
            shape.IsSelected = false;
        });

        this.Selection.clear();

        if(!nearShape)
            return;

        nearShape.IsSelected = true;
        this.Selection.add(nearShape);

        // if(this.Selection.has(nearShape)) {
        //     this.Selection.delete(nearShape);
        //
        //     alert('unselected ' + nearShape.id);
        // }
        // else {
        //     this.Selection.add(nearShape);
        //     alert('selected ' + nearShape.id);
        // }
    }
}