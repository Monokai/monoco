import { fix } from "../utils/FixNumber"

export interface GradientOptions {
	id: string
	angle: number
	colors: string[]
	precision: number
}

function generateStops(colors: string[], precision: number) {
	const round = fix(precision)

	const stops = colors.map((stopStr) => {
		const parts = stopStr.trim().split(/\s+/)

		const color = parts[0]
		let val:number | null = null

		if (parts.length > 1) {
			const rawVal = parts[1]

			val = rawVal.includes('%')
				? parseFloat(rawVal) / 100
				: parseFloat(rawVal)
		}

		return { color, val }
	})

	const len = stops.length

	if (stops[0].val === null) {
		stops[0].val = 0
	}

	if (stops[len - 1].val === null) {
		stops[len - 1].val = 1
	}

	let startIndex = 0

	while (startIndex < len - 1) {
		let endIndex = startIndex + 1

		while (endIndex < len && stops[endIndex].val === null) {
			endIndex++
		}

		if (endIndex > startIndex + 1) {
			const startVal = stops[startIndex].val as number
			const endVal = stops[endIndex].val as number
			const steps = endIndex - startIndex
			const increment = (endVal - startVal) / steps

			for (let i = 1; i < steps; i++) {
				stops[startIndex + i].val = startVal + increment * i
			}
		}

		startIndex = endIndex
	}

	return stops
		.map(stop => {
			return `<stop offset="${round(stop.val as number)}" stop-color="${stop.color}" />`
		})
		.join('')
}

export function createGradient({
	id,
	angle,
	colors,
	precision,
}: GradientOptions) {
	const round = fix(precision)
	const theta = angle * (Math.PI / 180)
	const unitX = Math.sin(theta)
	const unitY = -Math.cos(theta)
	const cornerX = unitX >= 0 ? 1 : 0
	const cornerY = unitY >= 0 ? 1 : 0
	const x = cornerX - 0.5
	const y = cornerY - 0.5
	const length = Math.abs(x * unitX + y * unitY)
	const x1 = round(0.5 - length * unitX)
	const y1 = round(0.5 - length * unitY)
	const x2 = round(0.5 + length * unitX)
	const y2 = round(0.5 + length * unitY)

	return `<linearGradient id="${id}" x1="${x1}" y1="${y1}"  x2="${x2}" y2="${y2}" gradientUnits="objectBoundingBox">${generateStops(colors, precision)}</linearGradient>`
}
