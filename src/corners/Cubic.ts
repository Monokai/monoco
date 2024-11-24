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
	const [rtl, rtr, rbr, rbl] = radii;
	const [ftl, ftr, fbr, fbl] = radii.map(r => r * (smoothing * 0.5 - 0.0))

	return [
		['M', ol, ot + rtl],
		['C', ol, ot + ftl, ol + ftl, ot, ol + rtl, ot],
		['L', width + ol - rtr, ot],
		['C', width + ol - ftr, ot, width + ol, ot + ftr, width + ol, ot + rtr],
		['L', width + ol, height - rbr + ot],
		['C', width + ol, height - fbr + ot, width - fbr + ol, height + ot, width - rbr + ol, height + ot],
		['L', ol + rbl, height + ot],
		['C', ol + fbl, height + ot, ol, height - fbl + ot, ol, height - rbl + ot],
		['Z']
	];
}