import { DefaultCornerTypeOptions } from '../utils/Path'
import { createPath as createSquirclePath } from './Squircle'

export function createPath(options:DefaultCornerTypeOptions) {
	return createSquirclePath({
		...options,
		smoothing: 0,
		preserveSmoothing: false,
		sweepFlag: 0
	})
}