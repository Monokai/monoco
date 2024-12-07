export function createPath({
	width,
	height,
	radii,
	offsets,
	sweepFlag
}:{
	width:number,
	height:number,
	radii:number[],
	offsets:number[],
	sweepFlag:number
}) {
	const [ot,,, ol] = offsets
	const [rtl, rtr, rbr, rbl] = radii

	return [
		['M', ol + rbl, ot],
		['L', width - rtr + ol, ot],
		['A', rtr, rtr, 0, 0, sweepFlag, width + ol, ot + rtr],
		['L', width + ol, height - rbr + ot],
		['A', rbr, rbr, 0, 0, sweepFlag, width - rbr + ol, height + ot],
		['L', ol + rbl, height + ot],
		['A', rbl, rbl, 0, 0, sweepFlag, ol, height - rbl + ot],
		['L', ol, ot + rtl],
		['A', rtl, rtl, 0, 0, sweepFlag, ol + rtl, ot],
		['Z']
	]
}