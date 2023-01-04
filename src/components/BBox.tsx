import React, { FC } from "react"
import { Prediction } from "../types/ApiCall"

interface IBoundingBoxProps {
	img_width: number | undefined
	img_height: number | undefined
	prediction_data: Prediction | undefined
}

const BBox: FC<IBoundingBoxProps> = ({
	img_width,
	img_height,
	prediction_data,
}) => {
	const imageWidth = img_width as number
	const imageHeight = img_height as number

	console.log(imageWidth, imageHeight)
	if (prediction_data === undefined) return null
	return (
		<>
			{prediction_data?.yolo_bbox.map((v, i) => {
				const x = Math.floor(v[0] * imageWidth)
				const y = Math.floor(v[1] * imageHeight)
				const x2 = Math.floor(v[2] * imageWidth)
				const y2 = Math.floor(v[3] * imageHeight)

				const w = x2 - x
				const h = y2 - y
				console.log(v)
				return (
					<div
						key={`box-${i}`}
						className={`absolute border-brightRedLight border-2 top-[${y}px] left-[${x}px] w-[${w}px] h-[${h}px]`}
					></div>
				)
			})}
		</>
	)
}

export default BBox
