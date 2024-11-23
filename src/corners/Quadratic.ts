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
		['Q', width + ol, ot, width + ol, ot + rt],
		['L', width + ol, height - rb + ot],
		['Q', width + ol, height + ot, width - rr + ol, height + ot],
		['L', ol + rl, height + ot],
		['Q', ol, height + ot, ol, height - rb + ot],
		['L', ol, ot + rt],
		['Q', ol, ot, ol + rl, ot],
		['Z']
	];
}