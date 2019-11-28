import {Scene} from "../scene/Scene";
import {vec4, Rect, vec2, vec3} from "../math";

export class Renderer {
    private scene: Scene;
    private zBuffer: Array<number>;

    private readonly view: HTMLCanvasElement;
    private readonly gl: WebGLRenderingContext;
    private readonly ctx: CanvasRenderingContext2D;

    public readonly Size: Rect;

    get View(): HTMLCanvasElement {
        return this.view;
    }

    constructor(scene: Scene) {
        this.scene = scene;

        this.Size = new Rect(new vec4(
           -scene.Size.Width / 2, -scene.Size.Height / 2,
           scene.Size.Width, scene.Size.Height
        ));

        this.zBuffer = new Array<number>(this.Size.Width * this.Size.Height);

        let container = document.getElementById('sceneContainer');

        this.view = document.createElement('canvas');
        this.view.id = 'canv-main';
        this.view.oncontextmenu = (e) => false;

        container.appendChild(this.view);

        // this.gl = this.initWebGl(this.view);
        this.ctx = this.view.getContext('2d');

        if(this.gl) {
            this.gl.clearColor(255.0, 255.0, 255.0, 1.0);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }

        this.initView();
    }

    private initView(): void {
        this.view.style.width = '100%';
        this.view.style.height = '100%';

        this.view.width = this.scene.Size.Width;
        this.view.height = this.scene.Size.Height;


        this.view.addEventListener('mousedown', (e: any) => {
            if(e.button == 2) {
                this.scene.Camera.ChangeMod();
            }
        })
    }

    private initWebGl(canvas): WebGLRenderingContext {
        let gl = null;

        try {
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch(e) {}

        if(!gl) {
            alert('Failed to init WebGL');
            gl = null;
        }

        return gl;
    }

    clear(): void {
        // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.ctx.clearRect(0, 0, this.Size.Width, this.Size.Height);
    }

    drawPixel(vec: vec3, color: string): void {
        if(vec.z < 0.1 || vec.z > 100)
            return;

        let idx = vec.x + vec.y * this.Size.Width;

        if(vec.z > this.zBuffer[idx]) {
            this.zBuffer[idx] = vec.z;
            // this.gl.fillStyle = color;
            // this.gl.fillRect(vec.x, vec.y, 1, 1);
        }
    }

    drawLineNew(from: vec3, to: vec3, color: string= 'black'): void {
        let isSteep = false;
        let temp;

        if(Math.abs(from.x - to.x) < Math.abs((from.y - to.y))) {
            temp = from.x;
            from.x = from.y;
            from.y = temp;

            temp = to.x;
            to.x = to.y;
            to.y = temp;

            isSteep = true;
        }

        if(from.x > to.x) {
            temp = from.x;
            from.x = to.x;
            to.x = temp;

            temp = from.y;
            from.y = to.y;
            to.y = temp;
        }

        let dx = to.x - from.x;
        let dy = to.y - from.y;
        let dz = to.z - from.z;

        let derror2 = Math.abs(dy) * 2;
        let error2 = 0;

        let y = Math.round(from.y);
        let z = from.z;

        for( let x = Math.round(from.x); x < to.x; ++x) {
            if(isSteep)
                this.drawPixel(new vec3(y, x, z), color);
            else
                this.drawPixel(new vec3(x, y, z), color);

            error2 += derror2;

            if(error2 > dx) {
                y += (to.y > from.y) ? 1 : -1;
                error2 -= dx * 2;
                z = from.z + (to.z - from.z) * ((x / from.x) / (to.x - from.x));
            }
        }
    }

    drawCircle(vec: vec2): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.arc(vec.x, vec.y, 2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawLine(from: vec2, to: vec2, color: string): void {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
    }

    private viewToScreen(vec: vec2): vec2 {
        return new vec4(
            this.Size.Right + vec.x,
            -(this.Size.Bottom + vec.y)
        );
    }

    private screenToView(vec: vec2): vec2 {
        return new vec4(

        );
    }
}