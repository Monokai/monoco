import type { BackgroundOptions, DefaultCornerTypeOptions } from "./utils/Path"
import type { ElementOptions } from "./utils/ElementManager"

import ElementManager from './utils/ElementManager'

export { createPath as FigmaSquircle } from './corners/FigmaSquircle'
export { createPath as Flat } from './corners/Flat'
export { createPath as Inset } from './corners/Inset'
export { createPath as Round } from './corners/Round'
export { createPath as RoundInverse } from './corners/RoundInverse'
export { createPath as Squircle } from './corners/Squircle'

export interface CornerOptions extends BackgroundOptions, ElementOptions {}

export interface CornerTypeOptions extends DefaultCornerTypeOptions {
	// allow any key / value combinations in addition to the default corner type options
	[_: string | number | symbol]: unknown;
}

interface DrawOptions {
	width?:number,
	height?:number,
	smoothing?:number,
	borderRadius?:number | number[],
	offset?:number | number[],
	cornerType?(options:CornerTypeOptions):(string | number)[][],
	precision?:number,
	isRounded?:boolean
}

export interface PathOptions extends DrawOptions {
	isArray?:boolean
}

export {
	createPath,
	addCorners
} from './utils/Path'

export function draw(element?:HTMLElement, options?:CornerOptions) {
	ElementManager.draw(element, options)
}

export function unobserve(element:HTMLElement) {
	ElementManager.unobserve(element)
}