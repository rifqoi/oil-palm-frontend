import React, { SyntheticEvent, useRef, useState } from "react"
import {
	AttributionControl,
	TileLayer,
	Rectangle,
	FeatureGroup,
	MapContainer,
} from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import Sidebar from "../components/Sidebar"

import { INominatimResult } from "../types/Nominatim"
import { Prediction, Tree } from "../types/ApiCall"
import { LatLngExpression } from "leaflet"

const getAddressData = async (
	address: string | undefined
): Promise<INominatimResult[]> => {
	const url = `https://nominatim.openstreetmap.org/?&q=${address}&format=json&limit=1`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const MapScreen = () => {
	const fgRef = useRef<L.FeatureGroup>(null)
	const mapRef = useRef<L.Map>(null)
	const [searchQuery, setSearchQuery] = useState<string | undefined>()
	const [predictionHistory, setPredictionHistory] = useState<boolean>(false)
	const [treeLocations, setTreeLocations] = useState<boolean>(false)
	const [locationFound, setLocationFound] = useState<boolean | null>(null)

	const onPredictionHistory = (e: SyntheticEvent) => {
		setPredictionHistory(true)
	}

	const onTreeLocations = (e: SyntheticEvent) => {
		setTreeLocations(true)
	}

	const onSearch = async (e: SyntheticEvent) => {
		e.preventDefault()
		if (searchQuery === undefined) return
		const addressData: INominatimResult[] = await getAddressData(searchQuery)
		if (addressData.length < 1) {
			setLocationFound(false)
			return
		}

		setLocationFound(true)

		const lat = parseFloat(addressData[0].lat)
		const lng = parseFloat(addressData[0].lon)

		const latlong = [lat, lng] as LatLngExpression
		mapRef.current?.flyTo(latlong, 18, {
			animate: true,
			duration: 2,
		})
	}
	return (
		<>
			<div className="flex">
				<div className="z-0">
					<Sidebar
						onSearch={onSearch}
						onTreeLocations={onTreeLocations}
						onPredictionHistory={onPredictionHistory}
						setSearchQuery={setSearchQuery}
					></Sidebar>
				</div>
				<MapContainer
					center={[-6.471428154696355, 107.02629987019694]}
					ref={mapRef}
					zoom={18}
					// className="h-[30rem] w-3/4 md:h-[30rem] md:w-3/4"
					className="w-full h-[100vh] z-10"
					maxZoom={22}
					attributionControl={false}
				>
					<AttributionControl prefix={false} />
					<FeatureGroup ref={fgRef}>
						<EditControl
							position="topleft"
							draw={{
								polyline: false,
								circle: false,
								polygon: false,
								marker: true,
								circlemarker: false,
								rectangle: {
									showArea: false,
								},
							}}
						/>
					</FeatureGroup>
					)
					<TileLayer
						// attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
						// url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						// url="https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga"
						url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
						maxZoom={22}
					/>
					<Rectangle
						bounds={[
							[-6.472634489929272, 107.02520310434704],
							[-6.4727091130627175, 107.02527686509495],
						]}
					/>
				</MapContainer>
			</div>
		</>
	)
}

export default MapScreen
