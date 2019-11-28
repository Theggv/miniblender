import {Rect, vec4} from "../math";

export class SceneGL {
    readonly Size: Rect;
    readonly view: HTMLCanvasElement;
    readonly gl: WebGLRenderingContext;

    constructor(width: number, height: number) {
        this.Size = new Rect(new vec4(0, 0, width, height));

        let container = document.getElementById('sceneContainer');

        this.view = document.createElement('canvas');
        this.view.id = 'canv-main';
        this.view.oncontextmenu = (e) => false;

        container.appendChild(this.view);

        this.gl = this.initWebGl(this.view);

        if(this.gl) {
            this.gl.clearColor(255.0, 255.0, 255.0, 1.0);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.gl.viewport(0, 0, width, height);
        }
    }

    render(): void {

    }

    private initShader(): void {
        var fragmentShader = this.getShader(this.gl, "shader-fs");
        var vertexShader = this.getShader(this.gl, "shader-vs");

        // создать шейдерную программу

        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        // Если создать шейдерную программу не удалось, вывести предупреждение

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program.");
        }

        this.gl.useProgram(shaderProgram);

        let vertexPositionAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexPosition");
        this.gl.enableVertexAttribArray(vertexPositionAttribute);
    }

    private getShader(gl, id) {
        var shaderScript, theSource, currentChild, shader;

        shaderScript = document.getElementById(id);

        if (!shaderScript) {
            return null;
        }

        theSource = "";
        currentChild = shaderScript.firstChild;

        while (currentChild) {
            if (currentChild.nodeType == currentChild.TEXT_NODE) {
                theSource += currentChild.textContent;
            }

            currentChild = currentChild.nextSibling;
        }
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
}