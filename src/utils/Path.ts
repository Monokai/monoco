import type { CornerOptions } from '..'
import type { RedrawOptions } from './ElementManager'

import ElementManager from './ElementManager'
import { createPath as Squircle } from '../corners/Squircle'
import { createSVGDatURI } from './Svg'
import { PathOptions } from '..'

export interface BackgroundOptions extends PathOptions {
	background?:string,
	border?:[number, string] | [number, string][],
	strokeDrawType?:number
	clipID?:string,
	clip?:boolean
}

export interface DefaultCornerTypeOptions {
	width:number,
	height:number,
	radii:number[],
	offsets:number[]
}

function createBackground(options:BackgroundOptions) {
	const {
		border:borderOrArray = [],
		offset:offsetOrArray = 0,
		strokeDrawType = 0,
		background,
		clip,
		clipID,
		width,
		height
	} = options

	const paths:string[] = []
	const borderArray = Array.isArray(borderOrArray?.[0]) ? borderOrArray : [borderOrArray]
	const offsetArray = Array.isArray(offsetOrArray) ? offsetOrArray : [offsetOrArray, offsetOrArray, offsetOrArray, offsetOrArray]
	const clipPath = clip ? null : createPath(options)

	if (borderArray?.length) {
		let borderRadius = 0

		const borderPaths:string[] = []

		for (let i = 0; i < borderArray.length; i++) {
			const [size, borderColor] = borderArray[i] as [number, string]

			const strokeWidth = strokeDrawType === 0 ? (borderRadius + size) * 2 : size

			if (size) {
				borderPaths.push(`<path d="${createPath({
					...options,
					offset: strokeDrawType === 0 ? offsetOrArray : offsetArray.map(o => o + borderRadius + size * 0.5)
				})}" fill="none" stroke="${borderColor}" stroke-width="${strokeWidth}" />`)

				borderRadius += size
			}
		}

		if (background) {
			if (clip) {
				paths.push(`<rect width="${width}" height="${height}" fill="${background}" />`)
			} else {
				paths.push(`<path d="${clipPath}" fill="${background}" />`)
			}
		}

		paths.push(...borderPaths.reverse())
	}

	return paths.length ? createSVGDatURI(paths, clipPath as string, clipID) : 'none'
}

export function createPath({
	width:w = 0,
	height:h = 0,
	radius:radiusOrArray = 0,
	offset:offsetOrArray = 0,
	smoothing = 1,
	type = Squircle,
	precision = 3,
	isArray = false
}:PathOptions) {
	if (!w || !h) {
		return isArray ? [] : ''
	}

	const offsets = Array.isArray(offsetOrArray) ? offsetOrArray : [offsetOrArray, offsetOrArray, offsetOrArray, offsetOrArray]
	const [ot, or, ob, ol] = offsets
	const width = w - ol - or
	const height = h - ot - ob
	const minSize = Math.min(width, height) * 0.5
	const radii = (Array.isArray(radiusOrArray) ? radiusOrArray : [radiusOrArray, radiusOrArray, radiusOrArray, radiusOrArray]).map((r, i) => Math.max(0, Math.min(r - offsets[i], minSize)))

	let path

	if (type) {
		path = type({
			width,
			height,
			radii,
			offsets,
			smoothing
		})
	} else {
		path = [[]]
	}

	path = path
		.filter(instructions => instructions[0])
		.map(([command, ...parameters]) => {
			const p = parameters.map(x => Number.isFinite(x) ? Number((x as number).toFixed(precision)) : x)
			const result = [
				command,
				isArray ? p : p.join(' ')
			]

			return isArray ? result : result.join('')
		})

	return isArray ? path : path.join('')
}

export function addCorners(element:HTMLElement, cornerOptions:CornerOptions) {
	ElementManager.setCornerOptions(element, cornerOptions)

	const drawFunk = (redrawOptions?:RedrawOptions) => {
		const options = ElementManager.getDrawOptions(element) ?? {} as CornerOptions

		if (!(options.width && options.height)) {
			const rect = element.getBoundingClientRect()

			options.width = rect.width
			options.height = rect.height
		}

		const combinedOptions = {...options, ...redrawOptions}

		if (combinedOptions.isRounded) {
			combinedOptions.width = combinedOptions.width ? Math.round(combinedOptions.width) : undefined
			combinedOptions.height = combinedOptions.height ? Math.round(combinedOptions.height) : undefined
		}

		element.style.clipPath = options.clip ? `path('${createPath(combinedOptions)}')` : ''

		if (options.background || options.border) {
			element.style.backgroundImage = createBackground(combinedOptions)
		}
	}

	drawFunk()

	return ElementManager.addElement(element, cornerOptions, drawFunk)
}