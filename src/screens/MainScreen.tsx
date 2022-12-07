import { SyntheticEvent, useState, useRef } from "react"
import LeafletMap from "../components/Map"
import Navbar from "../components/Navbar"
import SearchMap from "../components/SearchMap"
import L, { LatLngExpression } from "leaflet"
import { IAreaProps } from "../types/LatLong"
import { INominatimResult } from "../types/Nominatim"

const getAddressData = async (
	address: string | undefined
): Promise<INominatimResult[]> => {
	const url = `https://nominatim.openstreetmap.org/?&q=${address}&format=json&limit=1`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const MainScreen = () => {
	const mapRef = useRef<L.Map>(null)
	const [latLong, setLatLong] = useState<IAreaProps>()
	const [buttonLatLong, setButtonLatLong] = useState<IAreaProps>()
	const [searchQuery, setSearchQuery] = useState<string | undefined>()

	const onPredict = (e: SyntheticEvent) => {
		e.preventDefault()
		console.log(latLong)
		if (latLong !== null || latLong !== undefined) {
			setButtonLatLong(latLong)
		}
	}

	const onSearch = async (e: SyntheticEvent) => {
		e.preventDefault()
		const addressData: INominatimResult[] = await getAddressData(searchQuery)
		if (addressData.length < 1) {
			console.log("gak ada")
			return
		}

		const lat = parseFloat(addressData[0].lat)
		const lng = parseFloat(addressData[0].lon)

		const latlong = [lat, lng] as LatLngExpression
		mapRef.current?.flyTo(latlong, mapRef.current.getZoom(), {
			animate: true,
			duration: 2,
		})
	}

	return (
		<>
			<Navbar></Navbar>
			<div className="flex flex-col justify-items-center">
				<SearchMap
					setSearchQuery={setSearchQuery}
					onSubmit={onSearch}
				></SearchMap>
				<div className="flex  justify-center">
					<LeafletMap
						setLatLong={setLatLong}
						center={[-6.2, 106.816666]}
						mapRef={mapRef}
						zoom={16}
					>
						<></>
					</LeafletMap>
				</div>
				<div className="flex justify-center">
					<button
						onClick={onPredict}
						className="my-7 py-2 px-4 bg-brightRed hover:bg-brightRedLight rounded-md text-white text-sm"
					>
						Predict
					</button>
				</div>
				{buttonLatLong ? (
					<h1 className="items-center justify-center">
						{JSON.stringify(buttonLatLong)}
					</h1>
				) : null}
			</div>
		</>
	)
}

export default MainScreen
