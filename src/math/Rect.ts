import {vec4} from "./vec4";

export class Rect {
    private left: number;
    private bottom: number;

    private width: number;
    private height: number;

    get Left(): number {
        return this.left;
    }

    get Right(): number {
        return this.left + this.width;
    }

    get Bottom(): number {
        return this.bottom;
    }

    get Top(): number {
        return this.bottom + this.height;
    }

    get Width(): number {
        return this.width;
    }

    get Height(): number {
        return this.height;
    }

    /**
     *
     * @param vec x - left, y - bottom, z - width, w - height
     */
    constructor(vec: vec4) {
        this.left = vec.x;
        this.bottom = vec.y;
        this.width = vec.z;
        this.height = vec.w;
    }
}