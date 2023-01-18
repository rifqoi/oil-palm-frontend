import React, {
	FC,
	MutableRefObject,
	ReactEventHandler,
	RefObject,
	useState,
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
	const [emptyPrediction, setEmptyPrediction] = useState<boolean | null>(null)
	if (trees !== null) {
		if (trees.length < 1) {
			setEmptyPrediction(true)
		}
	}
	console.log(trees)
	return (
		<>
			<SidebarStickyPrevious
				onPrevious={onPrevious}
				sectionName="Predict Tree"
			/>
			{trees?.map((v) => {
				return (
					<TreeCard
						key={"tree" + v.id}
						rectRef={rectRef.current?.get(v.id)}
						mapRef={mapRef}
						popupRef={popupRef?.current?.get(v.id)}
						id={v.id}
						long={v.long}
						lat={v.lat}
						predicted_at={v.created_at}
					/>
				)
			})}
		</>
	)
}

export default SidebarPredictedTree
