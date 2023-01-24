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
	rectRef: MutableRefObject<Map<number, L.Rectangle> | null>
	popupRef: MutableRefObject<Map<number, L.Popup> | null>
	trees: Tree[] | null
}> = ({ onPrevious, trees, mapRef, rectRef, popupRef }) => {
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
							rectRef={rectRef}
							mapRef={mapRef}
							popupRef={popupRef}
							id={tree.id}
							long={tree.long}
							lat={tree.lat}
							predicted_at={tree.created_at}
						/>
					)
				})}
		</>
	)
}

export default SidebarPredictedTree
