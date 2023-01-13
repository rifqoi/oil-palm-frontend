import { LatLngTuple } from "leaflet"
import React, { FC, ReactNode, RefObject } from "react"
import { Popup } from "react-leaflet"
import { Rectangle } from "react-leaflet"
import { Tree } from "../types/ApiCall"

const Boxes: FC<{
	trees: Tree[]
}> = ({ trees }) => {
	return (
		<>
			{trees.map((tree, id) => {
				return (
					<Rectangle
						key={`tree-${id}`}
						bounds={[
							tree.nw_bounds as LatLngTuple,
							tree.se_bounds as LatLngTuple,
						]}
					>
						<Popup>
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
