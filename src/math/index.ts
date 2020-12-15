import { vec3 } from './vec3';
import { mat4 } from './mat4';

export { vec2 } from './vec2';
export { vec3 } from './vec3';
export { vec4 } from './vec4';

export { mat4 } from './mat4';
export { Rect } from './Rect';

export function degrees(rad: number): number {
	return (rad * 180) / Math.PI;
}

export function radians(deg: number): number {
	return (deg * Math.PI) / 180;
}
