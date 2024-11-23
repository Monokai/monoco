export function createPath({
	width,
	height,
	radii,
	offsets,
	smoothing
}:{
	width:number,
	height:number,
	radii:number[],
	offsets:number[],
	smoothing:number,
}) {
	const [ot,,, ol] = offsets;
	const [rt, rr, rb, rl] = radii;
	const [ft, fr, fb, fl] = radii.map(r => r * (smoothing * 0.5 - 0.0))

	return [
		['M', ol, ot + rt],
		['C', ol, ot + ft, ol + ft, ot, ol + rt, ot],
		['L', width + ol - rr, ot],
		['C', width + ol - fr, ot, width + ol, ot + fr, width + ol, ot + rr],
		['L', width + ol, height - rb + ot],
		['C', width + ol, height - fb + ot, width - fb + ol, height + ot, width - rb + ol, height + ot],
		['L', ol + rl, height + ot],
		['C', ol + fl, height + ot, ol, height - fl + ot, ol, height - rl + ot],
		['Z']
	];
}