import {Camera} from "./Camera";
import {Vector2D} from "../math/Vector2D";
import {Renderer} from "./Renderer";
import {FPSCounter} from "../util/FPSCounter";
import {SceneGraph} from "./SceneGraph";
import {Cursor} from "./Cursor";
import {RenderGroup} from "../render/RenderGroup";

export class Scene {
    private readonly renderer: Renderer;
    private readonly container: SceneGraph;

    private readonly camera: Camera;
    private cursor: Cursor;

    private fpsCounter: FPSCounter = new FPSCounter();

    // state variables
    private isControlPressed: boolean;
    private isAltPressed: boolean;
    private isDrawField: boolean;

    private canMoveHorizontal: boolean;
    private canMoveVertical: boolean;

    private readonly STEPSIZE = 16;


    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.container = new SceneGraph(this);

        this.camera = new Camera(new Vector2D(0, 0, 1));
        this.cursor = new Cursor(this);

        this.renderer.Element.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.renderer.Element.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.renderer.Element.addEventListener("mousemove", this.onMouseMove.bind(this));

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

        setInterval(() => {
            this.renderFrame();
        }, 1000 / 100);

        this.isDrawField = true;

        document.getElementById('fieldVisibility')
            .addEventListener('change', (e: any) => {
                this.isDrawField = e.target.checked;
            });
    }

    get Container(): SceneGraph {
        return this.container;
    }

    get Renderer(): Renderer {
        return this.renderer;
    }

    public posFromWorldToLocal(point: Vector2D): Vector2D {
        let cam = this.camera;

        return new Vector2D(
            (point.X - cam.Position.X) * this.STEPSIZE * cam.Zoom,
            -(point.Y + cam.Position.Y) * this.STEPSIZE * cam.Zoom,
            1
        );
    }

    public posFromLocalToWorld(point: Vector2D): Vector2D {
        let cam = this.camera;

        return new Vector2D(
            point.X / this.STEPSIZE / cam.Zoom + cam.Position.X,
            -point.Y / this.STEPSIZE / cam.Zoom - cam.Position.Y,
            1
        );
    }


    public drawLine(p1: Vector2D, p2: Vector2D, width: number = 1, color: string = 'black') {
        let fromPoint = this.renderer.convertFromCenterToCanvasCoords(
            this.posFromWorldToLocal(p1)
        );

        let toPoint = this.renderer.convertFromCenterToCanvasCoords(
            this.posFromWorldToLocal(p2)
        );

        let ctx = this.renderer.Context;

        ctx.beginPath();

        ctx.lineWidth = width;
        ctx.strokeStyle = color;

        ctx.moveTo(fromPoint.X, fromPoint.Y);
        ctx.lineTo(toPoint.X, toPoint.Y);

        ctx.stroke();
    }

    public drawCircle(point: Vector2D, radius: number, color: string = 'black') {
        let ctx = this.renderer.Context;
        let local = this.renderer.convertFromCenterToCanvasCoords(
            this.posFromWorldToLocal(point)
        );

        ctx.beginPath();
        ctx.fillStyle = color;

        ctx.arc(local.X, local.Y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    public recalcTriggerDistance(dist: number) {
        return dist / this.STEPSIZE / this.camera.Zoom;
    }

    public renderFrame() {
        this.renderer.Clear();

        // render field
        if(this.isDrawField)
            this.drawField();

        // render objects
        this.container.render();

        this.renderer.Draw();

        // render info
        this.drawCursorCoords();

        // shape info
        if(this.container.SelectedShapes.size == 1) {
            this.container.SelectedShapes.forEach(shape => {
                  document.getElementById('info').innerText = shape.Info(this)
            });

        }
        else {
            document.getElementById('info').innerText = '';
        }

        this.fpsCounter.call();
    }


    private drawField() {
        let ctx = this.renderer.Context;
        let localPos = this.posFromWorldToLocal(new Vector2D(0, 0, 1));

        const lightGray = '#808080';
        const darkGray = '#202020';
        const axisColor = '#202020';

        let step = Math.round(this.STEPSIZE * this.camera.Zoom);

        // draw light lines
        if (this.camera.Zoom >= 0.5) {
            if (this.camera.Zoom < 1)
                step *= 2;

            ctx.beginPath();

            // vertical lines
            for (let i = localPos.X % step; i <= this.renderer.Right; i += step) {
                ctx.moveTo(i + this.renderer.Width / 2, 0);
                ctx.lineTo(i + this.renderer.Width / 2, this.renderer.Height);
            }

            for (let i = localPos.X % step; i >= this.renderer.Left; i -= step) {
                ctx.moveTo(i + this.renderer.Width / 2, 0);
                ctx.lineTo(i + this.renderer.Width / 2, this.renderer.Height);
            }

            // horizontal lines
            for (let i = localPos.Y % step; i <= this.renderer.Top; i += step) {
                ctx.moveTo(0, i + this.renderer.Height / 2);
                ctx.lineTo(this.renderer.Width, i + this.renderer.Height / 2);
            }

            for (let i = localPos.Y % step; i >= this.renderer.Bottom; i -= step) {
                ctx.moveTo(0, i + this.renderer.Height / 2);
                ctx.lineTo(this.renderer.Width, i + this.renderer.Height / 2);
            }

            ctx.strokeStyle = lightGray;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        //    draw bold lines
        step = Math.round(this.STEPSIZE * this.camera.Zoom) * 10;
        ctx.beginPath();

        // vertical lines
        for (let i = localPos.X % step; i <= this.renderer.Right; i += step) {
            ctx.moveTo(i + this.renderer.Width / 2, 0);
            ctx.lineTo(i + this.renderer.Width / 2, this.renderer.Height);
        }

        for (let i = localPos.X % step; i >= this.renderer.Left; i -= step) {
            ctx.moveTo(i + this.renderer.Width / 2, 0);
            ctx.lineTo(i + this.renderer.Width / 2, this.renderer.Height);
        }

        // horizontal lines
        for (let i = localPos.Y % step; i <= this.renderer.Top; i += step) {
            ctx.moveTo(0, i + this.renderer.Height / 2);
            ctx.lineTo(this.renderer.Width, i + this.renderer.Height / 2);
        }

        for (let i = localPos.Y % step; i >= this.renderer.Bottom; i -= step) {
            ctx.moveTo(0, i + this.renderer.Height / 2);
            ctx.lineTo(this.renderer.Width, i + this.renderer.Height / 2);
        }

        ctx.strokeStyle = darkGray;
        ctx.lineWidth = 1;
        ctx.stroke();


        // draw axises
        ctx.beginPath();

        if (localPos.X >= this.renderer.Left && localPos.X <= this.renderer.Right) {
            ctx.moveTo(localPos.X + this.renderer.Width / 2, 0);
            ctx.lineTo(localPos.X + this.renderer.Width / 2, this.renderer.Height);
        }

        if (localPos.Y >= this.renderer.Bottom && localPos.Y <= this.renderer.Top) {
            ctx.moveTo(0, localPos.Y + this.renderer.Height / 2);
            ctx.lineTo(this.renderer.Width, localPos.Y + this.renderer.Height / 2);
        }

        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        this.renderer.Draw();
    }

    private drawCursorCoords() {
        let ctx = this.renderer.Context;

        let size = new Vector2D(180, 80, 1);
        let offset = new Vector2D(this.renderer.Width - size.X - 20, 20, 1);

        ctx.lineWidth = 2;
        ctx.fillStyle = 'white';
        ctx.fillRect(
            offset.X,
            offset.Y,
            size.X,
            size.Y);
        this.renderer.Draw();


        ctx.strokeStyle = 'black';
        ctx.strokeRect(
            offset.X,
            offset.Y,
            size.X,
            size.Y);
        this.renderer.Draw();

        ctx.fillStyle = 'black';
        ctx.font = '12px Verdana';

        let cursorPosText = '(' +
            (this.cursor.WorldCurrentPos.X).toFixed(1) +
            '; ' +
            (this.cursor.WorldCurrentPos.Y).toFixed(1) +
            ')';

        let cameraPosText = '(' +
            (this.camera.Position.X).toFixed(1) +
            '; ' +
            -(this.camera.Position.Y).toFixed(1) +
            ')';

        ctx.fillText('Cursor pos: ' + cursorPosText, offset.X + 5, offset.Y + 15);
        ctx.fillText('Camera pos: ' + cameraPosText, offset.X + 5, offset.Y + 35);
        ctx.fillText('FPS: ' + this.fpsCounter.FPS, offset.X + 5, offset.Y + 55);

        this.renderer.Draw();
    }

    private onMouseDown(e: any) {
        this.cursor.click(e.layerX, e.layerY);
    }


    private onMouseUp(e: any) {
        // clear selections if control is not pressed
        if (!this.isControlPressed) {
            this.container.SelectedShapes.forEach(shape => {
                shape.SetSelection(false);

                while(shape.Parent) {
                    shape = shape.Parent;
                    shape.SetSelection(false);
                }
            });
            this.container.SelectedShapes.clear();
        }

        try {
            this.container.Shapes.forEach(shape => {
                if (shape.IsCollide(this.cursor.WorldClickPos, this)) {
                    if (!this.container.SelectedShapes.has(shape)) {
                        shape.SetSelection(true);

                        let collideShape =  shape.GetCollideShape(this.cursor.WorldClickPos, this);
                        collideShape.SetSelection(true);

                        this.container.SelectedShapes.add(collideShape);
                    } else {
                        shape.SetSelection(false);
                        this.container.SelectedShapes.delete(shape);
                    }

                    // break point
                    throw new Error();
                }
            });
        } catch (e) {
        }
    }

    private onMouseMove(e: any) {
        this.cursor.update(e.layerX, e.layerY);

        if(this.canMoveHorizontal || this.canMoveVertical) {
            if (this.container.SelectedShapes.size) {
                // Move shapes by offset

                let offset = new Vector2D(
                    (this.canMoveHorizontal ?
                        this.cursor.WorldCurrentPos.X - this.cursor.WorldClickPos.X : 0),
                    (this.canMoveVertical ?
                        this.cursor.WorldCurrentPos.Y - this.cursor.WorldClickPos.Y : 0),
                    1
                );

                this.cursor.click(e.layerX, e.layerY);

                this.container.SelectedShapes.forEach(shape => {
                    shape.Move(offset);
                });
            }
        }
        else if(this.isAltPressed) {
            if (e.buttons & 1) {
                  // move camera
                this.camera.move(new Vector2D(
                    -this.cursor.WorldCurrentPos.X + this.cursor.WorldClickPos.X,
                    this.cursor.WorldCurrentPos.Y - this.cursor.WorldClickPos.Y,
                    1
                ));
            }
        }
    }

    private onKeyDown(e: any) {
        // console.log(e);

        if (e.code === 'ControlLeft') {
            this.isControlPressed = true;
        }

        if (e.code === 'AltLeft') {
            this.isAltPressed = true;
        }
    }

    private onKeyUp(e: any) {
        // console.log(e);

        if (e.code === 'ControlLeft') {
            this.isControlPressed = false;
        }

        if (e.code === 'AltLeft') {
            this.isAltPressed = false;
        }


        if (e.code === 'KeyG') {
            if(this.container.SelectedShapes.size > 1) {
                let group = new RenderGroup();

                // add members to group
                this.container.SelectedShapes.forEach(shape => {
                    while(shape.Parent) {
                        shape = shape.Parent;
                    }

                    group.Members.add(shape);
                });

                // remove group members from list of shapes
                group.Members.forEach(shape => {
                    this.container.Shapes.delete(shape);
                });

                this.container.SelectedShapes.clear();

                this.container.Shapes.add(group);
                this.container.SelectedShapes.add(group);
            }
            else if(this.container.SelectedShapes.size == 1) {
                this.container.SelectedShapes.forEach(shape => {
                    let group = shape as RenderGroup;

                    if(!group)
                        return;

                    group.Members.forEach(groupMember => {
                        this.container.Shapes.add(groupMember);
                        this.container.SelectedShapes.add(groupMember);
                    });

                    this.container.Shapes.delete(group);
                    this.container.SelectedShapes.delete(group);
                })
            }
        }

        if (e.code === 'KeyM') {
            if (!this.canMoveVertical || !this.canMoveHorizontal) {
                this.canMoveHorizontal = true;
                this.canMoveVertical = true;
            } else {
                this.canMoveHorizontal = false;
                this.canMoveVertical = false;
            }

            if (this.canMoveVertical) {
                this.cursor.click(
                    this.cursor.LocalCurrentPos.X,
                    this.cursor.LocalCurrentPos.Y
                );
            }
        }

        if (e.code === 'KeyX') {
            this.canMoveHorizontal = (!this.canMoveHorizontal || this.canMoveVertical);
            this.canMoveVertical = false;

            if(this.canMoveHorizontal) {
                this.cursor.click(
                    this.cursor.LocalCurrentPos.X,
                    this.cursor.LocalCurrentPos.Y
                );
            }
        }

         if (e.code === 'KeyY') {
            this.canMoveHorizontal = false;
            this.canMoveVertical = (this.canMoveHorizontal || !this.canMoveVertical);

            if(this.canMoveVertical) {
                this.cursor.click(
                    this.cursor.LocalCurrentPos.X,
                    this.cursor.LocalCurrentPos.Y
                );
            }
        }
    }
}