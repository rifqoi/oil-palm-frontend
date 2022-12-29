import * as fs from "fs"

export type BoundingBox = {
	xs: number[]
	ys: number[]
	widths: number[]
	heights: number[]
}

export const ParseYOLO = (data: string): BoundingBox => {
	let xs: number[] = []
	let ys: number[] = []
	let widths: number[] = []
	let heights: number[] = []
	data.split(/\r?\n/).forEach((line) => {
		let yoloString = line.split(/\s/)
		let x = parseFloat(yoloString[1])
		let y = parseFloat(yoloString[2])
		let width = parseFloat(yoloString[3])
		let height = parseFloat(yoloString[4])

		xs.push(x)
		ys.push(y)
		widths.push(width)
		heights.push(height)
	})

	const yolo: BoundingBox = {
		xs: xs,
		ys: ys,
		widths: widths,
		heights: heights,
	}

	return yolo
}

export const ConvertYOLOToCOCO = (
	yoloBbox: BoundingBox,
	imgWidth: number,
	imgHeight: number
): BoundingBox | undefined => {
	let xs: number[] = []
	let ys: number[] = []
	let widths: number[] = []
	let heights: number[] = []
	console.log(yoloBbox.xs.length)
	for (let i = 0; i < yoloBbox.xs.length; i++) {
		let yoloX = yoloBbox.xs[i]
		let yoloY = yoloBbox.ys[i]
		let yoloWidth = yoloBbox.widths[i]
		let yoloHeight = yoloBbox.heights[i]

		let cocoX = yoloX * imgWidth - yoloWidth / 2
		let cocoY = yoloY * imgHeight - yoloHeight / 2
		let cocoWidth = yoloWidth * imgWidth
		let cocoHeight = yoloHeight * imgHeight

		xs.push(cocoX)
		ys.push(cocoY)
		widths.push(cocoWidth)
		heights.push(cocoHeight)
	}

	let cocoBbox: BoundingBox = {
		xs: xs,
		ys: ys,
		heights: heights,
		widths: widths,
	}

	return cocoBbox
}
