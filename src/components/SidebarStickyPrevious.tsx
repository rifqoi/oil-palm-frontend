import React, { FC, ReactEventHandler, ReactNode } from "react"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

const SidebarStickyPrevious: FC<{
	onPrevious: ReactEventHandler<HTMLDivElement>
	sectionName: string
}> = ({ onPrevious, sectionName }) => {
	return (
		<>
			<div
				className="group z-20 bg-white sticky top-0 text-2xl"
				onClick={onPrevious}
			>
				<div className="flex cursor-pointer py-3 items-center">
					<AiOutlineArrowLeft className="group-hover:text-brightRedLight mr-2" />
					<div className="group-hover:text-brightRedLight">{sectionName}</div>
				</div>
				<hr className="" />
			</div>
		</>
	)
}

export default SidebarStickyPrevious
