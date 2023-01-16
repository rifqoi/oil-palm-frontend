import React, { FC, ReactEventHandler, ReactNode } from "react"

import { AiOutlineArrowRight } from "react-icons/ai"

const SidebarMain: FC<{
	onPredictionHistory: ReactEventHandler<HTMLDivElement>
	onTreeLocations: ReactEventHandler<HTMLDivElement>
	onPredictTree: ReactEventHandler<HTMLDivElement>
}> = ({ onPredictionHistory, onTreeLocations, onPredictTree }) => {
	return (
		<>
			<div className="group text-xl" onClick={onPredictTree}>
				<div className="flex cursor-pointer py-3 justify-between items-center">
					<div className="group-hover:text-brightRedLight">Predict Tree</div>
					<AiOutlineArrowRight className="group-hover:text-brightRedLight" />
				</div>
				<hr className="" />
			</div>
			{/* Card */}
			<div className="group text-xl" onClick={onPredictionHistory}>
				<div className="flex cursor-pointer py-3 justify-between items-center">
					<div className="group-hover:text-brightRedLight">
						Prediction History
					</div>
					<AiOutlineArrowRight className="group-hover:text-brightRedLight" />
				</div>
				<hr className="" />
			</div>
			<div className="group text-xl" onClick={onTreeLocations}>
				<div className="flex cursor-pointer py-3 justify-between items-center">
					<div className="group-hover:text-brightRedLight">Tree Locations</div>
					<AiOutlineArrowRight className="group-hover:text-brightRedLight" />
				</div>
				<hr className="" />
			</div>
		</>
	)
}

export default SidebarMain
