import {Camera, ViewMod} from "./Camera";
import {Renderer} from "../renderer/Renderer";
import {Container} from "./Container";
import {mat4, Rect, vec3, vec4} from "../math";
import {Box, Line, Plane} from "../shape/primitives";
import {DepthVS} from "../shader/DepthVS";

export class Scene {
    readonly Size: Rect;
    readonly Camera: Camera;
    readonly Renderer: Renderer;
    readonly Container: Container;

    constructor(width: number, height: number) {
        this.Size = new Rect(new vec4(0, 0, width, height));
        this.Renderer = new Renderer(this);
        this.Container = new Container(this);

        this.Camera = new Camera(
            new vec3(-200, 50, -200), 0, 0
        );

        // x - red
        this.Container.Shapes.push(
            new Line(this, new vec4(), new vec4(100, 0), 'red'));

        // y - green
        this.Container.Shapes.push(
            new Line(this, new vec4(), new vec4(0, 100), 'green'));

        // z - blue
        this.Container.Shapes.push(
            new Line(this, new vec4(), new vec4(0, 0, 100), 'blue'));

        this.domiq();
        // this.qubiq()

        setInterval(() => this.render(), 1000 / 100);
        // this.render();
    }

    domiq(): void {
        // DOMIQ

        let offset = new vec4(30, 0, 10);

        // korobka 150x100x50
        this.Container.Shapes.push(new Box(this,
            offset,
            new vec4(offset.x + 150, offset.y + 50, offset.z + 100)
        ));

        // krisha 150x100x30
        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x, offset.y + 50, offset.z),
            new vec4(offset.x + 150, offset.y + 50, offset.z),
            new vec4(offset.x + 150, offset.y + 80, offset.z + 50),
            new vec4(offset.x, offset.y + 80, offset.z + 50)
        ));

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x, offset.y + 50, offset.z + 100),
            new vec4(offset.x + 150, offset.y + 50, offset.z + 100),
            new vec4(offset.x + 150, offset.y + 80, offset.z + 50),
            new vec4(offset.x, offset.y + 80, offset.z + 50)
        ));

        // okna

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x + 20, offset.y + 15, offset.z),
            new vec4(offset.x + 50, offset.y + 15, offset.z),
            new vec4(offset.x + 50, offset.y + 35, offset.z),
            new vec4(offset.x + 20, offset.y + 35, offset.z),
        ));

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x + 60, offset.y + 15, offset.z),
            new vec4(offset.x + 90, offset.y + 15, offset.z),
            new vec4(offset.x + 90, offset.y + 35, offset.z),
            new vec4(offset.x + 60, offset.y + 35, offset.z),
        ));

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x + 100, offset.y + 15, offset.z),
            new vec4(offset.x + 130, offset.y + 15, offset.z),
            new vec4(offset.x + 130, offset.y + 35, offset.z),
            new vec4(offset.x + 100, offset.y + 35, offset.z),
        ));


        // okna s drugoy storoni

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x + 20, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 50, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 50, offset.y + 35, offset.z + 100),
            new vec4(offset.x + 20, offset.y + 35, offset.z + 100),
        ));

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x + 60, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 90, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 90, offset.y + 35, offset.z + 100),
            new vec4(offset.x + 60, offset.y + 35, offset.z + 100),
        ));

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x + 100, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 130, offset.y + 15, offset.z + 100),
            new vec4(offset.x + 130, offset.y + 35, offset.z + 100),
            new vec4(offset.x + 100, offset.y + 35, offset.z + 100),
        ));

        // dver'

        this.Container.Shapes.push(new Plane(this,
            new vec4(offset.x + 150, offset.y, offset.z + 30),
            new vec4(offset.x + 150, offset.y, offset.z + 70),
            new vec4(offset.x + 150, offset.y + 40, offset.z + 70),
            new vec4(offset.x + 150, offset.y + 40, offset.z + 30),
        ));
    }

    qubiq(): void {
        this.Container.Shapes.push(
            new Box(this,
                new vec4(-10, -10, -10),
                new vec4(10, 10, 10)
            ));
    }

    render(): void {
        DepthVS.ViewMatrix = this.Camera.ViewMatrix;

        if (this.Camera.Mod == ViewMod.Perspective)
            DepthVS.Projection =
                Camera.PerspectiveMatrix(this.Size.Width, this.Size.Height);
        else
            DepthVS.Projection =
                Camera.OrthographicMatrix(this.Size.Width, this.Size.Height);

        DepthVS.Viewport = Camera.ViewPort(this.Size.Width, this.Size.Height);
        DepthVS.CalculateMatrix();

        // mat4.debug(DepthVS.ViewMatrix, "ViewMatrix:");
        // mat4.debug(DepthVS.Projection, "Projection:");
        // mat4.debug(DepthVS.Viewport, "Viewport:");

        this.Camera.update();

        this.Container.render();
    }
}