import React, { FC, ReactEventHandler, ReactNode } from "react"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

const SidebarPredictImage: FC<{
	onPrevious: ReactEventHandler<HTMLDivElement>
}> = ({ onPrevious }) => {
	return (
		<>
			<div className="group sticky top-0 text-2xl" onClick={onPrevious}>
				<div className="flex cursor-pointer py-3 items-center">
					<AiOutlineArrowLeft className="group-hover:text-brightRedLight mr-2" />
					<div className="group-hover:text-brightRedLight">Predict Tree</div>
				</div>
				<hr className="" />
			</div>
		</>
	)
}

export default SidebarPredictImage
