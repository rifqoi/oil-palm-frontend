import React, { FC } from "react"
import Sketch from "react-p5"
import type P5 from "p5"
import { Prediction } from "../types/ApiCall"

interface IBoundingBoxProps {
	img_width: number | undefined
	img_height: number | undefined
	prediction_data: Prediction | undefined
}

const BoundingBox: FC<IBoundingBoxProps> = ({
	img_width,
	img_height,
	prediction_data,
}) => {
	const setup = (p5: P5, canvasParentRef: Element) => {
		const width = img_width as number
		const height = img_height as number
		p5.createCanvas(width, height).parent(canvasParentRef)
	}

	const drawResult = (object: P5) => {
		drawBoundingBox(object)
		// drawLabel(object)
	}

	// draw bounding box around the detected object
	const drawBoundingBox = (p5: P5) => {
		// Sets the color used to draw lines.
		p5.stroke("red")
		// width of the stroke
		p5.strokeWeight(2)
		// Disables filling geometry
		p5.noFill()
		// draw an rectangle
		// x and y are the coordinates of upper-left corner, followed by width and height
		const imageWidth = img_width as number
		const imageHeight = img_height as number
		if (prediction_data !== undefined) {
			prediction_data.yolo_bbox.map((data) => {
				// x, y, w, h
				const x = Math.floor(data[0] * imageWidth)
				const y = Math.floor(data[1] * imageHeight)
				const x2 = Math.floor(data[2] * imageWidth)
				const y2 = Math.floor(data[3] * imageHeight)

				const w = x2 - x
				const h = y2 - y
				p5.rect(x, y, w, h)
			})
		}
	}

	// draw label of the detected object (inside the box)
	const drawLabel = (p5: P5) => {
		// Disables drawing the stroke
		// p5.noStroke()
		p5.stroke("blue")
		// width of the stroke
		p5.strokeWeight(2)
		// sets the color used to fill shapes
		// p5.fill("white")
		p5.noFill()
		// set font size
		p5.textSize(10)
		// draw string to canvas
		p5.rect(0, 0, 100, 200)
		// p5.text("oilpalm", 0, 5.5)
	}

	return (
		<Sketch className="absolute top-0 left-0" setup={setup} draw={drawResult} />
	)
}

export default BoundingBox
