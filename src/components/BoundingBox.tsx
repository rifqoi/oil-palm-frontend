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
        console.log(prediction_data)
        prediction_data!.coco_bbox.map((data, i) => {
            // x, y, w, h
            p5.rect(data[0], data[1], data[2], data[3])
        })
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
