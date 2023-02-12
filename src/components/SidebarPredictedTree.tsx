import React, {
	FC,
	MutableRefObject,
	ReactEventHandler,
	RefObject,
} from "react"
import { Tree } from "../types/ApiCall"
import SidebarStickyPrevious from "./SidebarStickyPrevious"
import TreeCard from "./TreeCard"

const SidebarPredictedTree: FC<{
	onPrevious: ReactEventHandler<HTMLDivElement>
	mapRef: RefObject<L.Map>
	rectRef?: MutableRefObject<Map<number, L.Rectangle> | null>
	popupRef?: MutableRefObject<Map<number, L.Popup> | null>
	trees: Tree[] | null
	setDeleteTreeID: React.Dispatch<React.SetStateAction<number | null>>
	setEditTreeID: React.Dispatch<React.SetStateAction<number | null>>
}> = ({
	onPrevious,
	trees,
	mapRef,
	rectRef,
	popupRef,
	setDeleteTreeID,
	setEditTreeID,
}) => {
	return (
		<>
			<SidebarStickyPrevious
				onPrevious={onPrevious}
				sectionName="Predict Tree"
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
							id={tree.tree_id}
							long={tree.long}
							lat={tree.lat}
							predicted_at={tree.created_at}
							setDeleteTreeID={setDeleteTreeID}
							setEditTreeID={setEditTreeID}
						/>
					)
				})}
		</>
	)
}

export default SidebarPredictedTree
