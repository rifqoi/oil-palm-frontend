import React, { FC, ReactEventHandler, useState } from "react"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import SearchMap from "./SearchMap"

const Sidebar: FC<{
	onSearch: ReactEventHandler<HTMLFormElement>
	onPredictionHistory: ReactEventHandler<HTMLDivElement>
	onTreeLocations: ReactEventHandler<HTMLDivElement>
	setSearchQuery: React.Dispatch<React.SetStateAction<string | undefined>>
}> = ({ onSearch, setSearchQuery, onPredictionHistory, onTreeLocations }) => {
	return (
		<div className="flex">
			<div className="w-80 h-screen">
				<SearchMap
					onSearch={onSearch}
					setSearchQuery={setSearchQuery}
					className="w-full py-5 px-5"
				/>
				{/* Card */}
				<div className="flex cursor-pointer px-8 py-3 justify-between items-center">
					<div onClick={onPredictionHistory}>Prediction History</div>
					<AiOutlineArrowRight />
				</div>
				{/* // */}
				<div>
					<hr />
				</div>
				<div className="flex cursor-pointer px-8 py-3 justify-between items-center">
					<div onClick={onTreeLocations}>Tree Locations</div>
					<AiOutlineArrowRight />
				</div>
				<div>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default Sidebar
