export function createPath({
	width,
	height,
	radii,
	offsets
}:{
	width:number,
	height:number,
	radii:number[],
	offsets:number[]
}) {
	const [ot,,, ol] = offsets;
	const [rt, rr, rb, rl] = radii;

	return [
		['M', ol + rl, ot],
		['L', width - rr + ol, ot],
		['A', rr, rr, 0, 0, 1, width + ol, ot + rr],
		['L', width + ol, height - rb + ot],
		['A', rb, rb, 0, 0, 1, width - rb + ol, height + ot],
		['L', ol + rl, height + ot],
		['A', rl, rl, 0, 0, 1, ol, height - rl + ot],
		['L', ol, ot + rt],
		['A', rt, rt, 0, 0, 1, ol + rt, ot],
		['Z']
	];
}