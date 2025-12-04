import { DefaultCornerTypeOptions } from '../utils/Path'
import { createPath as createSquirclePath } from './Squircle'

export const createPath = (options:DefaultCornerTypeOptions & {
	smoothing?:number
}) => createSquirclePath({
	...options,
	preserveSmoothing: false,
	sweepFlag: 1
})