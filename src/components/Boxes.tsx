import { LatLngTuple } from "leaflet"
import React, { FC, MutableRefObject, useRef } from "react"
import { Popup } from "react-leaflet"
import { Rectangle } from "react-leaflet"
import { Tree } from "../types/ApiCall"

const Boxes: FC<{
	trees: Tree[]
	rectRefs: MutableRefObject<Map<number, L.Rectangle> | null>
	popupRefs: MutableRefObject<Map<number, L.Popup> | null>
}> = ({ trees, rectRefs, popupRefs }) => {
	// const rectRef = useRef<Map<number, L.Rectangle> | null>(null)
	// const popupRef = useRef<Map<number, L.Popup> | null>(null)

	const getRectMap = () => {
		if (!rectRefs.current) {
			rectRefs.current = new Map()
		}

		return rectRefs.current
	}

	const getPopupMap = () => {
		if (!popupRefs.current) {
			popupRefs.current = new Map()
		}

		return popupRefs.current
	}

	return (
		<>
			{trees.map((tree, id) => {
				return (
					<Rectangle
						key={`tree-${id}`}
						ref={(props) => {
							const map = getRectMap()
							if (props) {
								map.set(tree.tree_id, props)
							} else {
								map.delete(tree.tree_id)
							}
						}}
						bounds={[
							tree.nw_bounds as LatLngTuple,
							tree.se_bounds as LatLngTuple,
						]}
					>
						<Popup
							ref={(props) => {
								const map = getPopupMap()
								if (props) {
									map?.set(tree.tree_id, props)
								} else {
									map?.delete(tree.tree_id)
								}
							}}
						>
							ID : {tree.id}
							<br />
							Confidence : {tree.confidence}
							<br />
							Lat: {tree.lat}
							<br />
							Long: {tree.long}
						</Popup>
					</Rectangle>
				)
			})}
		</>
	)
}

export default Boxes
