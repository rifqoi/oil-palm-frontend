import React, { FC, RefObject, SyntheticEvent } from "react"
import L, { LatLngExpression } from "leaflet"

const TreeCard: FC<{
	id: number
	lat: number
	long: number
	predicted_at: string
	mapRef: RefObject<L.Map>
	rectRef: L.Rectangle | undefined
	popupRef: L.Popup | undefined
}> = ({ lat, long, predicted_at, id, rectRef, popupRef, mapRef }) => {
	const flyToBox = (e: SyntheticEvent) => {
		e.preventDefault()
		console.log("map", mapRef)
		console.log(rectRef)
		console.log(popupRef)
		const center = rectRef?.getCenter() as LatLngExpression
		mapRef.current?.flyTo(center, 18)

		popupRef?.openPopup()
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
						<td>Predicted at</td>
						<td className="pl-3">{predicted_at}</td>
					</tr>
				</tbody>
			</table>
			<div className="flex justify-end py-2 px-2 relative">
				<button
					onClick={flyToBox}
					className="py-2 absolute px-4 bg-yellow-400 mx-4 rounded-md border-2 border-black"
				>
					Jump
				</button>
				<button className="py-2 px-4 mx-2 bg-green-400 rounded-md border-2 border-black">
					Edit
				</button>
				<button className="py-2 px-4 bg-red-400 rounded-md border-2 border-black">
					Delete
				</button>
			</div>
		</div>
	)
}

export default TreeCard