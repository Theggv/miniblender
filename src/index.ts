/*
import {Renderer} from "./legacy/scene/Renderer";
import {SceneControl} from "./legacy/scene/SceneControl";
import {Scene} from "./legacy/scene/Scene";

let canvas = new Renderer(
    document.getElementById('canvas') as HTMLCanvasElement,
    document.getElementById('canvas-buffer') as HTMLCanvasElement
);

let scene = new Scene(canvas);
let control = new SceneControl(scene);

*/

import {Scene} from "./new/scene/Scene";

let scene = new Scene(1280, 720);