import React, { FC, ReactEventHandler } from "react"
import LoadingSpinner from "./LoadingSpinner"
import SidebarStickyPrevious from "./SidebarStickyPrevious"
import TreeCard from "./TreeCard"

const SidebarTreeLocations: FC<{
	onPrevious: ReactEventHandler<HTMLDivElement>
}> = ({ onPrevious }) => {
	return (
		<>
			<SidebarStickyPrevious
				onPrevious={onPrevious}
				sectionName="Tree Locations"
			/>
			<div className="flex items-center justify-center">
				<LoadingSpinner />
			</div>
		</>
	)
}

export default SidebarTreeLocations
