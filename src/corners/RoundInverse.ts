import { DefaultCornerTypeOptions } from '../utils/Path'
import { createPath as createSquirclePath } from './Squircle'

export const createPath = (options:DefaultCornerTypeOptions) => createSquirclePath({
	...options,
	smoothing: 0,
	preserveSmoothing: false,
	sweepFlag: 0
})