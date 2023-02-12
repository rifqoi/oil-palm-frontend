import { LatLng, LatLngBounds } from "leaflet"
import React, { FC, ReactEventHandler, ReactNode, useState } from "react"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { Prediction, Tree } from "../types/ApiCall"
import Boxes from "./Boxes"
import LoadingSpinner from "./LoadingSpinner"
import SidebarStickyPrevious from "./SidebarStickyPrevious"
import TreeCard from "./TreeCard"

const SidebarEditTree: FC<{
	onPrevious: ReactEventHandler<HTMLDivElement>
	onEditStop: ReactEventHandler<HTMLButtonElement>
	className?: string
}> = ({ className, onPrevious, onEditStop }) => {
	return (
		<>
			<div className={className ? `${className}` : ""}>
				<SidebarStickyPrevious
					onPrevious={onPrevious}
					sectionName="Predict Tree"
				/>

				<div>
					<div className="pt-5">Apakah edit sudah benar?</div>
					<div>
						<button
							onClick={onEditStop}
							className="my-3 p-3 text-md rounded-xl bg-sky-500 text-gray-100 border-2 border-gray-600 hover:bg-sky-600"
						>
							Ya
						</button>
						<button
							onClick={onEditStop}
							className="my-3 mx-4 p-3 text-md rounded-xl bg-white text-gray-500 border-2 border-gray-600 hover:bg-gray-300"
						>
							Kembali
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default SidebarEditTree
