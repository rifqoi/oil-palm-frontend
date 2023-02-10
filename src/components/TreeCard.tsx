import React, { FC, MutableRefObject, RefObject, SyntheticEvent } from "react"
import L, { LatLngExpression } from "leaflet"
import { Tree } from "../types/ApiCall"
import { deleteTree, getTreesHistory } from "../libs/api"

const TreeCard: FC<{
	id: number
	lat: number
	long: number
	predicted_at: string
	confidence: number
	mapRef?: RefObject<L.Map>
	rectRef?: MutableRefObject<Map<number, L.Rectangle> | null>
	popupRef?: MutableRefObject<Map<number, L.Popup> | null>
	setDeleteTreeID: React.Dispatch<React.SetStateAction<number | null>>
}> = ({
	confidence,
	lat,
	long,
	predicted_at,
	id,
	rectRef,
	mapRef,
	setDeleteTreeID,
}) => {
	const flyToBox = (e: SyntheticEvent) => {
		const myRect = rectRef?.current?.get(id)
		const center = [lat, long] as LatLngExpression
		e.preventDefault()
		mapRef?.current?.flyTo(center, 20, {
			animate: true,
			duration: 1,
		})
		setTimeout(() => {
			myRect?.openPopup(center)
		}, 500)
	}

	const onEdit = (e: SyntheticEvent) => {
		// setEditTreeID(id)
		return
	}

	const onDeleteClick = (e: SyntheticEvent) => {
		const myRect = rectRef?.current?.get(id)
		myRect?.closePopup()
		setDeleteTreeID(id)
	}

	return (
		<div className="w-full border-2 border-gray-500 rounded-md text-md my-2">
			<table className="table-auto ml-5 mt-2">
				<tbody>
					<tr>
						<td>ID</td>
						<td className="pl-3">{id}</td>
					</tr>
					<tr>
						<td>Latitude</td>
						<td className="pl-3">{lat}</td>
					</tr>
					<tr>
						<td>Longitude</td>
						<td className="pl-3">{long}</td>
					</tr>
					<tr>
						<td>Confidence</td>
						<td className="pl-3">{confidence}</td>
					</tr>
					<tr>
						<td>Predicted at</td>
						<td className="pl-3">{predicted_at}</td>
					</tr>
				</tbody>
			</table>
			<div className="flex justify-end py-2 px-2 relative">
				<button
					onClick={flyToBox}
					className="py-2 px-4 mx-2 bg-yellow-400 rounded-md border-2 border-black"
				>
					Jump
				</button>
				<button className="py-2 px-4 mx-2 bg-green-400 rounded-md border-2 border-black">
					Edit
				</button>
				<button
					className="py-2 px-4 bg-red-400 rounded-md border-2 border-black"
					onClick={onDeleteClick}
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default TreeCard
