import type { CornerOptions } from '..'
import type { RedrawOptions } from './ElementManager'

import ElementManager from './ElementManager'
import { createGradient } from './LinearGradient'
import { createPath as Squircle } from '../corners/Squircle'
import { createSVGDatURI } from './Svg'
import { PathOptions } from '..'
import { fix } from '../utils/FixNumber'

export interface BackgroundOptions extends PathOptions {
	background?:string,
	border?:[number, string] | [number, string][] | [number, number, string[]] | [number, number, string[]][],
	strokeDrawType?:number
	idPrefix?:string,
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
		idPrefix = 'm',
		width,
		height,
		precision = 3
	} = options

	const paths:string[] = []
	const borderArray = Array.isArray(borderOrArray?.[0]) ? borderOrArray : [borderOrArray]
	const offsetArray = Array.isArray(offsetOrArray) ? offsetOrArray : [offsetOrArray, offsetOrArray, offsetOrArray, offsetOrArray]
	const clipPath = clip ? null : createPath(options)

	let gradients:string[] | undefined

	if (borderArray?.length) {
		let totalBorderRadius = 0

		const borderPaths:string[] = []

		for (let i = 0; i < borderArray.length; i++) {
			if (typeof (borderArray[i] as [number, string | number])[1] === 'number') {
				const [size, angle, borderColors] = borderArray[i] as [number, number, string[]]

				if (size) {
					const gradientID = `${idPrefix}g${i}`

					if (!gradients) {
						gradients = []
					}

					gradients.push(createGradient({
						id: gradientID,
						angle,
						colors: borderColors,
						precision
					}))

					const strokeWidth = strokeDrawType === 0 ? (totalBorderRadius + size) * 2 : size

					borderPaths.push(`<path d="${createPath({
						...options,
						offset: strokeDrawType === 0 ? offsetOrArray : offsetArray.map(o => o + totalBorderRadius + size * 0.5)
					})}" fill="none" stroke="url(#${gradientID})" stroke-width="${strokeWidth}" />`)

					totalBorderRadius += size
				}
			} else {
				const [size, borderColor] = borderArray[i] as [number, string]

				if (size) {
					const strokeWidth = strokeDrawType === 0 ? (totalBorderRadius + size) * 2 : size

					borderPaths.push(`<path d="${createPath({
						...options,
						offset: strokeDrawType === 0 ? offsetOrArray : offsetArray.map(o => o + totalBorderRadius + size * 0.5)
					})}" fill="none" stroke="${borderColor}" stroke-width="${strokeWidth}" />`)

					totalBorderRadius += size
				}
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

	return paths.length ? createSVGDatURI({
		paths,
		clipPath: clipPath as string,
		gradients,
		idPrefix
	}) : 'none'
}

export function createPath({
	width:w = 0,
	height:h = 0,
	borderRadius:radiusOrArray = 0,
	offset:offsetOrArray = 0,
	smoothing = 1,
	cornerType = Squircle,
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

	let radii

	if (Array.isArray(radiusOrArray)) {
		// https://drafts.csswg.org/css-backgrounds/#corner-overlap
		const sides = radiusOrArray.map((r, i) => r + radiusOrArray[(i + 1) % 4])
		const f = Math.min(...sides.map((s, i) => (i % 2 === 0 ? width : height) / s))

		if (f < 1) {
			radii = radiusOrArray.map(r => r * f)
		} else {
			radii = radiusOrArray
		}
	} else {
		radii = [radiusOrArray, radiusOrArray, radiusOrArray, radiusOrArray].map((r, i) => Math.max(
			0,
			Math.min(r - offsets[i], Math.min(width, height) * 0.5)
		))
	}

	let pathData

	if (cornerType) {
		pathData = cornerType({
			width,
			height,
			radii,
			offsets,
			smoothing
		})
	} else {
		pathData = [[]]
	}

	const round = fix(precision)

	if (isArray) {
		return pathData
			.filter(cmd => cmd[0])
			.map(([cmd, ...params]) => [cmd, ...params.map(p => typeof p === 'number' ? round(p) : p)])
	}

	let d = ''

	for (let i = 0; i < pathData.length; i++) {
		const cmd = pathData[i]

		if (!cmd[0]) {
			continue
		}

		d += cmd[0]

		for (let j = 1; j < cmd.length; j++) {
			const val = cmd[j]

			d += (typeof val === 'number' ? round(val) : val) + ' '
		}
	}

	return d.trim()
}

export function addCorners(element:HTMLElement, cornerOptions:CornerOptions) {
	ElementManager.setCornerOptions(element, cornerOptions)

	const drawFunk = (redrawOptions?:RedrawOptions) => {
		const options = ElementManager.getDrawOptions(element) ?? {} as CornerOptions
		const combinedOptions = {...options, ...redrawOptions}

		if (combinedOptions.isRounded) {
			combinedOptions.width = combinedOptions.width ? Math.round(combinedOptions.width) : undefined
			combinedOptions.height = combinedOptions.height ? Math.round(combinedOptions.height) : undefined
		}

		if (combinedOptions.width && combinedOptions.height) {
			element.style.clipPath = options.clip ? `path('${createPath(combinedOptions)}')` : ''

			if (options.background || options.border) {
				element.style.backgroundImage = createBackground(combinedOptions)
			}
		}
	}

	drawFunk()

	return ElementManager.addElement(element, cornerOptions, drawFunk)
}