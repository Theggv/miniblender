import {Camera, ViewMod} from "./Camera";
import {Renderer} from "../renderer/Renderer";
import {Container} from "./Container";
import {mat4, radians, Rect, vec3, vec4} from "../math";
import {Line, Plane} from "../shape/primitives";
import {DepthVS} from "../shader/DepthVS";
import {FPSCounter} from "../util/FPSCounter";
import {Frustum} from "../renderer/Frustum";
import {Box} from "../shape/primitives/Box";

export class Scene {
    private fpsCounter: FPSCounter;

    Size: Rect;
    readonly Camera: Camera;
    readonly Renderer: Renderer;
    readonly Container: Container;

    constructor(width: number, height: number) {
        this.Size = new Rect(new vec4(0, 0, width, height));
        this.Renderer = new Renderer(this);
        this.Container = new Container(this);

        this.fpsCounter = new FPSCounter();

        this.Camera = new Camera(
            new vec3(200, 100, 250), 225, -30
        );

        this.addAxis();
        this.addField();

        this.domiq();

        setInterval(() => this.draw(), 1000 / 100);
        // setTimeout(() => this.draw(), 1000 / 100);
    }

    private addAxis(): void {
        // x - red
        this.Container.StaticObjects.add(
            new Line(this, new vec4(), new vec4(100, 0, 0), 'red', 5));

        // y - green
        this.Container.StaticObjects.add(
            new Line(this, new vec4(), new vec4(0, 100, 0), 'green', 5));

        // z - blue
        this.Container.StaticObjects.add(
            new Line(this, new vec4(), new vec4(0, 0, 100), 'blue', 5));
    }

    private addField(): void {
        let step = 50;
        let numLines = 20;

        for (let x = -step * numLines; x <= step * numLines; x += step) {
            this.Container.StaticObjects.add(new Line(this,
                new vec4(x, 0, -step * numLines),
                new vec4(x, 0, step * numLines),
                'grey', 2));
        }

        for (let z = -step * numLines; z <= step * numLines; z += step) {
            this.Container.StaticObjects.add(new Line(this,
                new vec4(-step * numLines, 0, z),
                new vec4(step * numLines, 0, z),
                'grey', 2));
        }
    }

    domiq(): void {
        // DOMIQ

        let offset = new vec4(30, 0, 10);

        // korobka 150x100x50
        this.Container.DynamicObjects.add(new Box(this,
            offset,
            new vec4(offset.x + 150, offset.y + 50, offset.z + 100)
        ));

        // krisha 150x100x30
        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x, offset.y + 50, offset.z),
            new vec4(offset.x + 150, offset.y + 50, offset.z),
            new vec4(offset.x + 150, offset.y + 80, offset.z + 50),
            new vec4(offset.x, offset.y + 80, offset.z + 50)
        ));

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x, offset.y + 50, offset.z + 100),
            new vec4(offset.x + 150, offset.y + 50, offset.z + 100),
            new vec4(offset.x + 150, offset.y + 80, offset.z + 50),
            new vec4(offset.x, offset.y + 80, offset.z + 50)
        ));

        // okna

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x + 20, offset.y + 15, offset.z),
            new vec4(offset.x + 50, offset.y + 15, offset.z),
            new vec4(offset.x + 50, offset.y + 35, offset.z),
            new vec4(offset.x + 20, offset.y + 35, offset.z),
        ));

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x + 60, offset.y + 15, offset.z),
            new vec4(offset.x + 90, offset.y + 15, offset.z),
            new vec4(offset.x + 90, offset.y + 35, offset.z),
            new vec4(offset.x + 60, offset.y + 35, offset.z),
        ));

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x + 100, offset.y + 15, offset.z),
            new vec4(offset.x + 130, offset.y + 15, offset.z),
            new vec4(offset.x + 130, offset.y + 35, offset.z),
            new vec4(offset.x + 100, offset.y + 35, offset.z),
        ));


        // okna s drugoy storoni

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x + 20, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 50, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 50, offset.y + 35, offset.z + 100),
            new vec4(offset.x + 20, offset.y + 35, offset.z + 100),
        ));

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x + 60, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 90, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 90, offset.y + 35, offset.z + 100),
            new vec4(offset.x + 60, offset.y + 35, offset.z + 100),
        ));

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x + 100, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 130, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 130, offset.y + 35, offset.z + 100),
            new vec4(offset.x + 100, offset.y + 35, offset.z + 100),
        ));

        // dver'

        this.Container.DynamicObjects.add(new Plane(this,
            new vec4(offset.x + 150, offset.y, offset.z + 30),
            new vec4(offset.x + 150, offset.y, offset.z + 70),
            new vec4(offset.x + 150, offset.y + 40, offset.z + 70),
            new vec4(offset.x + 150, offset.y + 40, offset.z + 30),
        ));
    }

    draw(): void {
        DepthVS.ViewMatrix = this.Camera.ViewMatrix;

        if (this.Camera.Mod == ViewMod.Perspective)
            DepthVS.Projection =
                Camera.PerspectiveMatrix(this.Size.Width, this.Size.Height);
        else
            DepthVS.Projection =
                Camera.OrthographicMatrix(this.Size.Width, this.Size.Height);

        DepthVS.Viewport = Camera.ViewPort(this.Size.Width, this.Size.Height);
        DepthVS.InverseViewport = this.Renderer.getInverseViewport();
        DepthVS.CalculateMatrix();

        Frustum.Instance.recalculate(DepthVS.ViewMatrix, DepthVS.Projection);
        // mat4.debug(DepthVS.ViewMatrix, "ViewMatrix:");
        // mat4.debug(DepthVS.Projection, "Projection:");
        // mat4.debug(mat4.mul(DepthVS.ViewMatrix, DepthVS.Projection), 'Peremnojennoe');
        // mat4.debug(DepthVS.Viewport, "Viewport:");

        this.Camera.update();

        this.Container.render();

        this.fpsCounter.call();
    }
}