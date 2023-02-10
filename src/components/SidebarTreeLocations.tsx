import React, {
	FC,
	MutableRefObject,
	ReactEventHandler,
	RefObject,
} from "react"
import { Tree } from "../types/ApiCall"
import LoadingSpinner from "./LoadingSpinner"
import SidebarStickyPrevious from "./SidebarStickyPrevious"
import TreeCard from "./TreeCard"

const SidebarTreeLocations: FC<{
	onPrevious: ReactEventHandler<HTMLDivElement>
	mapRef: RefObject<L.Map>
	rectRef: MutableRefObject<Map<number, L.Rectangle> | null>
	popupRef: MutableRefObject<Map<number, L.Popup> | null>
	trees: Tree[] | null
	setDeleteTreeID: React.Dispatch<React.SetStateAction<number | null>>
}> = ({ onPrevious, mapRef, rectRef, popupRef, setDeleteTreeID, trees }) => {
	return (
		<>
			<SidebarStickyPrevious
				onPrevious={onPrevious}
				sectionName="Tree Locations"
			/>

			{popupRef &&
				rectRef &&
				trees?.map((tree) => {
					return (
						<TreeCard
							key={"tree" + tree.id}
							confidence={tree.confidence}
							rectRef={rectRef}
							mapRef={mapRef}
							popupRef={popupRef}
							id={tree.id}
							long={tree.long}
							lat={tree.lat}
							predicted_at={tree.created_at}
							setDeleteTreeID={setDeleteTreeID}
						/>
					)
				})}
		</>
	)
}

export default SidebarTreeLocations
