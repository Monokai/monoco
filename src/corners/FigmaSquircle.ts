import { DefaultCornerTypeOptions } from '../utils/Path'
import { createPath as createSquirclePath } from './Squircle'

export function createPath(options:DefaultCornerTypeOptions & {
	smoothing?:number
}) {
	return createSquirclePath({
		...options,
		preserveSmoothing: false,
		sweepFlag: 1
	})
}