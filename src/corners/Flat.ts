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
		['M', ol + rt, ot],
		['L', width - rr + ol, ot],
		['L', width + ol, ot + rr],
		['L', width + ol, height - rb + ot],
		['L', width - rb + ol, height + ot],
		['L', ol + rl, height + ot],
		['L', ol, height - rl + ot],
		['L', ol, ot + rt],
		['Z']
	];
}