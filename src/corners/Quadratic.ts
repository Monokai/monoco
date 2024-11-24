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
	const [rtl, rtr, rbr, rbl] = radii;

	return [
		['M', ol + rbl, ot],
		['L', width - rtr + ol, ot],
		['Q', width + ol, ot, width + ol, ot + rtl],
		['L', width + ol, height - rbr + ot],
		['Q', width + ol, height + ot, width - rtr + ol, height + ot],
		['L', ol + rbl, height + ot],
		['Q', ol, height + ot, ol, height - rbr + ot],
		['L', ol, ot + rtl],
		['Q', ol, ot, ol + rbl, ot],
		['Z']
	];
}