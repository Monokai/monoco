/*
Adapted from "figma-squircle" (https://github.com/phamfoo/figma-squircle),
refactored and optimized by Monokai

---

MIT License

Copyright (c) 2021 Tien Pham

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function getSquircleCorner(
	radius:number,
	smoothing:number,
	preserveSmoothing:boolean,
	maxSize:number
) {
	let p = (1 + smoothing) * radius

	if (!preserveSmoothing) {
		smoothing = Math.min(smoothing, maxSize / radius - 1)
		p = Math.min(p, maxSize)
	}

	const arc = Math.PI * 0.5 * (1 - smoothing)
	const arcLength = Math.sin(arc / 2) * radius * 2 ** 0.5
	const angle = Math.PI * 0.25 * smoothing
	const c = radius * Math.tan((Math.PI * 0.5 - arc) * 0.25) * Math.cos(angle)
	const d = c * Math.tan(angle)

	let b = (p - arcLength - c - d) / 3
	let a = 2 * b

	if (preserveSmoothing && p > maxSize) {
		const pDist2 = maxSize - d - arcLength - c
		const maxB = pDist2 - pDist2 / 6

		b = Math.min(b, maxB)
		a = pDist2 - b
		p = Math.min(p, maxSize)
	}

	return {
		a,
		b,
		c,
		d,
		p,
		arcLength,
		radius,
		ab: a + b,
		bc: b + c,
		abc: a + b + c
	}
}


function createSquircleCorner(
	radius:number,
	c1:number[],
	arcLength:number,
	arcMultiplier:number[],
	c2:number[],
	l:number[]
) {
	if (radius) {
		return [
			['c', ...c1],
			...[arcLength ? ['a', radius, radius, 0, 0, 1, ...arcMultiplier.map(x => x * arcLength)] : []],
			['c', ...c2]
		]
	}

	return [['l', ...l]]
}

export function createPath({
	width,
	height,
	smoothing,
	radii,
	offsets,
	preserveSmoothing
}:{
	width:number,
	height:number,
	smoothing:number,
	radii:number[],
	offsets:number[],
	preserveSmoothing:boolean,
}) {
	const [ot,,, ol] = offsets
	const [c1, c2, c3, c4] = radii.map(radius => getSquircleCorner(
		radius,
		smoothing,
		preserveSmoothing,
		Math.min(width, height) * 0.5
	))

	return [
		['M', width - c2.p + ol, ot],
		...createSquircleCorner(
			c2.radius,
			[c2.a, 0, c2.ab, 0, c2.abc, c2.d],
			c2.arcLength, [1, 1],
			[c2.d, c2.c, c2.d, c2.bc, c2.d, c2.abc],
			[c2.p, 0]
		),
		['L', width + ol, height - c3.p + ot],
		...createSquircleCorner(
			c3.radius,
			[0, c3.a, 0, c3.ab, -c3.d, c3.abc],
			c3.arcLength, [-1, 1],
			[-c3.c, c3.d, -c3.bc, c3.d, -c3.abc, c3.d],
			[0, c3.p]
		),
		['L', c4.p + ol, height + ot],
		...createSquircleCorner(
			c4.radius,
			[-c4.a, 0, -c4.ab, 0, -c4.abc, -c4.d],
			c4.arcLength, [-1, -1],
			[-c4.d, -c4.c, -c4.d, -c4.bc, -c4.d, -c4.abc],
			[-c4.p, 0]
		),
		['L', ol, c1.p + ot],
		...createSquircleCorner(
			c1.radius,
			[0, -c1.a, 0, -c1.ab, c1.d, -c1.abc],
			c1.arcLength, [1, -1],
			[c1.c, -c1.d, c1.bc, -c1.d, c1.abc, -c1.d],
			[0, -c1.p]
		),
		['Z']
	]
}