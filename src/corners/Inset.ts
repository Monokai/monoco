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
	const [ot,,, ol] = offsets
	const [rtl, rtr, rbr, rbl] = radii

	return [
		['M', ol + rbl, ot],
		['L', width - rtr + ol, ot],
		['L', width - rtr + ol, ot + rtr],
		['L', width + ol, ot + rtr],
		['L', width + ol, height - rbr + ot],
		['L', width - rbr + ol, height - rbr + ot],
		['L', width - rbr + ol, height + ot],
		['L', ol + rbl, height + ot],
		['L', ol + rbl, height - rbl + ot],
		['L', ol, height - rbl + ot],
		['L', ol, ot + rtl],
		['L', ol + rtl, ot + rtl],
		['L', ol + rtl, ot],
		['Z']
	]
}