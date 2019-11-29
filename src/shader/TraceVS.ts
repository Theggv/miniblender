import {vec2, vec4} from "../math";
import {DepthVS} from "./DepthVS";

export class TraceVS {
    static trace(vec: vec2): vec4 {

        let ray = new vec4(vec.x, vec.y, 1.0, 1.0);
        // ray.debug('Ekran');

        ray = ray.mulVecMat(DepthVS.Viewport.inverse());
        // ray.debug('NDC');

        ray.z = -1.0;

        ray = ray.mulVecMat(DepthVS.Projection.inverse());
        // ray.debug('After Projection');

        ray.z = -1.0;
        ray.w = 0.0;

        ray = ray.mulVecMat(DepthVS.ViewMatrix.inverse());
        ray.debug('Ray');

        return ray;
    }
}