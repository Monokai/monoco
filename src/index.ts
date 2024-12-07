import { createPath as createSquirclePath } from './corners/Squircle'
import { createPath as createFlatPath } from './corners/Flat'
import { createPath as createInsetPath } from './corners/Inset'
import { createPath as createRoundPath } from './corners/Round'
import { createSVGDatURI } from './utils/Svg'
import ElementManager from './utils/ElementManager'
import type { ElementOptions, RedrawOptions } from './utils/ElementManager'

export enum CornerType {
	Squircle = 'squircle',
	FigmaSquircle = 'figma-squircle',
	Flat = 'flat',
	Inset = 'inset',
	Round = 'round',
	RoundInverse = 'round-inverse'
}

type DrawOptions = {
	width?:number,
	height?:number,
	smoothing?:number,
	radius?:number | number[],
	offset?:number | number[],
	type?:CornerType,
	precision?:number,
	isRounded?:boolean
}

export type PathOptions = DrawOptions & {
	isArray?:boolean
}

type BackgroundOptions = PathOptions & {
	background?:string,
	border?:[number, string] | [number, string][],
	strokeDrawType?:number
	clipID?:string,
	clip?:boolean
}

export type CornerOptions = BackgroundOptions & ElementOptions

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

			borderPaths.push(`<path d="${createPath({
				...options,
				offset: strokeDrawType === 0 ? offsetOrArray : offsetArray.map(o => o + borderRadius + size * 0.5)
			})}" fill="none" stroke="${borderColor}" stroke-width="${strokeWidth}" />`)

			borderRadius += size
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
	smoothing = 1,
	radius:radiusOrArray = 0,
	offset:offsetOrArray = 0,
	type = CornerType.Squircle,
	precision = 3,
	isArray = false
}:PathOptions) {
	if (!w || !h) {
		return isArray ? [] : ''
	}

	const preserveSmoothing = type === CornerType.Squircle
	const sweepFlag = type === CornerType.RoundInverse ? 0 : 1
	const offsets = Array.isArray(offsetOrArray) ? offsetOrArray : [offsetOrArray, offsetOrArray, offsetOrArray, offsetOrArray]
	const [ot, or, ob, ol] = offsets
	const width = w - ol - or
	const height = h - ot - ob
	const minSize = Math.min(width, height) * 0.5
	const radii = (Array.isArray(radiusOrArray) ? radiusOrArray : [radiusOrArray, radiusOrArray, radiusOrArray, radiusOrArray]).map((r, i) => Math.max(0, Math.min(r - offsets[i], minSize)))

	let path

	switch (type) {
	case CornerType.Round:
	case CornerType.RoundInverse:
		path = path = createRoundPath({
			width,
			height,
			radii,
			offsets,
			sweepFlag
		})

		break
	case CornerType.Flat:
		path = path = createFlatPath({
			width,
			height,
			radii,
			offsets
		})

		break
	case CornerType.Inset:
		path = path = createInsetPath({
			width,
			height,
			radii,
			offsets
		})

		break
	case CornerType.Squircle:
	case CornerType.FigmaSquircle:
	default:
		path = createSquirclePath({
			width,
			height,
			smoothing,
			radii,
			offsets,
			preserveSmoothing
		})

		break
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

// function parseNumber(value: string, isRounded: boolean = false) {
// 	const x = Number.parseFloat(value.replace(/px$/, ''));

// 	return isRounded ? Math.round(x) : x;
// }

export function addCorners(element:HTMLElement, cornerOptions:CornerOptions) {
	ElementManager.setCornerOptions(element, cornerOptions)

	const drawFunk = (redrawOptions?:RedrawOptions) => {
		const options = ElementManager.getDrawOptions(element) ?? {}

		if (!(options.width && options.height)) {
			const rect = element.getBoundingClientRect()

			options.width = rect.width
			options.height = rect.height
		}

		// if (options.useCSS) {
		// 	['backgroundColor', 'borderRadius', 'borderWidth'].forEach((x:string) => element.style[x as any] = '')

		// 	const style = window.getComputedStyle(element)
		// 	const backgroundColor = style['backgroundColor']
		// 	const borderColor = style['borderColor']
		// 	const borderWidth = parseNumber(style['borderWidth'], options.isRounded)
		// 	const radii = [
		// 		'borderTopLeftRadius',
		// 		'borderTopRightRadius',
		// 		'borderBottomRightRadius',
		// 		'borderBottomLeftRadius'
		// 	].map(x => parseNumber(style[x as any], options.isRounded))

		// 	element.style.backgroundColor = 'transparent';
		// 	element.style.borderRadius = '0';
		// 	element.style.borderWidth = '0';

		// 	options.color = backgroundColor;
		// 	options.border = [[borderWidth, borderColor]];
		// 	options.radius = radii;
		// }

		const combinedOptions = {...options, ...redrawOptions}

		if (combinedOptions.isRounded) {
			combinedOptions.width = combinedOptions.width ? Math.round(combinedOptions.width) : undefined
			combinedOptions.height = combinedOptions.height ? Math.round(combinedOptions.height) : undefined
		}

		if (options.clip) {
			element.style.clipPath = `path('${createPath(combinedOptions)}')`
		}

		if (options.background || options.border) {
			element.style.backgroundImage = createBackground(combinedOptions)
		}
	}

	drawFunk()

	return ElementManager.addElement(element, cornerOptions, drawFunk)
}

export function draw(element?:HTMLElement, options?:CornerOptions) {
	ElementManager.draw(element, options)
}

export function unobserve(element:HTMLElement) {
	ElementManager.unobserve(element)
}