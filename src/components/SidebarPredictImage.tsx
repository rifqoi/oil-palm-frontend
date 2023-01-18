import { LatLng, LatLngBounds } from "leaflet"
import React, { FC, ReactEventHandler, ReactNode, useState } from "react"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { Prediction, Tree } from "../types/ApiCall"
import Boxes from "./Boxes"
import LoadingSpinner from "./LoadingSpinner"
import SidebarStickyPrevious from "./SidebarStickyPrevious"
import TreeCard from "./TreeCard"

const SidebarPredictImage: FC<{
	onPrevious: ReactEventHandler<HTMLDivElement>
	trees: Tree[] | null
	rectangleCenter: LatLng | undefined
	setRectangleCenter: React.Dispatch<React.SetStateAction<LatLng | undefined>>
	setRectangleMouse: React.Dispatch<React.SetStateAction<LatLngBounds | null>>
	onSelectArea: ReactEventHandler<HTMLButtonElement>
	onPredict: ReactEventHandler<HTMLButtonElement>
	loading: boolean
	className?: string
}> = ({
	trees,
	className,
	loading,
	onPrevious,
	onPredict,
	rectangleCenter,
	onSelectArea,
	setRectangleCenter,
	setRectangleMouse,
}) => {
	return (
		<>
			<div className={className ? `${className}` : ""}>
				<SidebarStickyPrevious
					onPrevious={onPrevious}
					sectionName="Predict Tree"
				/>

				{loading ? (
					<LoadingSpinner className="flex justify-center items-center py-60" />
				) : (
					<div>
						<div className="pt-5">Pilih Area untuk di Prediksi</div>
						<div>
							<button
								onClick={onSelectArea}
								className="my-3 p-3 text-md rounded-xl bg-sky-500 text-gray-100 border-2 border-gray-600 hover:bg-sky-600"
							>
								Pilih Area
							</button>
							{rectangleCenter ? (
								<button
									onClick={() => {
										setRectangleCenter(undefined)
										setRectangleMouse(null)
									}}
									className="my-3 mx-4 p-3 text-md rounded-xl bg-white text-gray-500 border-2 border-gray-600 hover:bg-gray-300"
								>
									Clear
								</button>
							) : null}
						</div>
						<div>
							<div className="pt-5">Prediksi Area Sawit</div>
							<button
								onClick={onPredict}
								className={`my-3 p-3 text-md rounded-xl  border-2 border-gray-600  ${
									rectangleCenter === undefined
										? "disabled:opacity-80 cursor-not-allowed hover:bg-gray-300 text-gray-500"
										: "bg-sky-500 text-gray-100"
								}`}
								disabled={!rectangleCenter}
							>
								Prediksi
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default SidebarPredictImage
