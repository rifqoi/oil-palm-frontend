import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Logo from "../assets/logo.png"
import {
	AttributionControl,
	TileLayer,
	Rectangle,
	FeatureGroup,
	MapContainer,
} from "react-leaflet"
import { EditControl } from "react-leaflet-draw"

import { INominatimResult } from "../types/Nominatim"
import { Prediction, Tree } from "../types/ApiCall"
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet"
import SidebarEmpty from "../components/SidebarEmpty"
import SidebarMain from "../components/SidebarMain"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import SearchMap from "../components/SearchMap"
import { ZoomControl } from "react-leaflet"
import SidebarPredictImage from "../components/SidebarPredictImage"

import { LeafletMouseEvent, LatLng, LatLngBounds } from "leaflet"
import { Popup } from "react-leaflet"

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
	const [sbPredictTree, setSBPredictTree] = useState<boolean>(false)
	const [sbPredictionHistory, setSBPredictionHistory] = useState<boolean>(false)
	const [sbTreeLocations, setSBTreeLocations] = useState<boolean>(false)
	const [sbMoveFromMain, setSBMoveFromMain] = useState<boolean>(false)
	const [locationFound, setLocationFound] = useState<boolean | null>(null)
	const [rectangleMouse, setRectangleMouse] = useState<LatLngBounds | null>(
		null
	)
	const [rectangleCenter, setRectangleCenter] = useState<LatLng>()
	const [mouseMoveEvent, setMouseMoveEvent] = useState<boolean>(false)
	const rectRef = useRef<L.Rectangle>(null)

	const onPredictionHistory = (e: SyntheticEvent) => {
		console.log("prediction")
		setSBMoveFromMain(true)
		setSBPredictionHistory(true)
	}

	const onPredictTree = (e: SyntheticEvent) => {
		setSBMoveFromMain(true)
		setSBPredictTree(true)
		if (mapRef.current && !sbMoveFromMain) {
			mapRef.current.on("mousemove", (e: LeafletMouseEvent) => {
				setMouseMoveEvent(true)
				setRectangleMouse(e.latlng.toBounds(100))
				console.log(rectRef.current?.getCenter())
			})
			mapRef.current.on("click", (e: LeafletMouseEvent) => {
				setMouseMoveEvent(false)
				console.log("clicL", rectRef.current?.getCenter())
			})
		}
	}

	useEffect(() => {
		if (mapRef.current) {
			const map = mapRef.current

			if (!mouseMoveEvent) {
				console.log("mati")
				setRectangleCenter(rectRef.current?.getCenter())
				console.log(rectangleCenter)
				map.off("mousemove")
			}
		}
	}, [mouseMoveEvent, mapRef, rectRef])

	const onTreeLocations = (e: SyntheticEvent) => {
		setSBMoveFromMain(true)
		setSBTreeLocations(true)
	}

	const onPrevious = (e: SyntheticEvent) => {
		setSBMoveFromMain(false)
		setSBTreeLocations(false)
		setSBPredictTree(false)
		setSBPredictionHistory(false)
		setMouseMoveEvent(false)
		setRectangleMouse(null)
		setRectangleCenter(undefined)
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
				<div
					className={`container flex flex-col z-50 relative bg-white px-5 w-3/12 h-screen ${
						!sbMoveFromMain && "pt-5"
					}`}
				>
					{sbMoveFromMain ? null : (
						<img
							className="text-center mr-auto self-center h-5 sm:h-10"
							src={Logo}
							alt=""
						/>
					)}
					<div className="flex flex-col flex-1 py-5 justify-between pb-5">
						<div>
							<SidebarEmpty className="">
								{!sbPredictTree && !sbPredictionHistory && !sbTreeLocations ? (
									<SidebarMain
										onPredictTree={onPredictTree}
										onTreeLocations={onTreeLocations}
										onPredictionHistory={onPredictionHistory}
									/>
								) : null}
								{sbPredictTree ? (
									<SidebarPredictImage onPrevious={onPrevious} />
								) : null}
							</SidebarEmpty>
						</div>
						<div className="items-start">asdasd</div>
					</div>
				</div>
				<SearchMap
					onSearch={onSearch}
					setSearchQuery={setSearchQuery}
					className="w-2/3 h-10 z-10 py-5 px-5"
				/>
				<MapContainer
					zoomControl={false}
					center={[-6.471428154696355, 107.02629987019694]}
					ref={mapRef}
					zoom={18}
					// className="h-[30rem] w-3/4 md:h-[30rem] md:w-3/4"
					className="w-full h-screen z-0 absolute"
					maxZoom={21}
					attributionControl={false}
				>
					<AttributionControl prefix={false} />
					<FeatureGroup ref={fgRef}>
						<EditControl
							position="bottomright"
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
						<ZoomControl position="topright" />
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
					{rectangleMouse ? (
						<Rectangle ref={rectRef} bounds={rectangleMouse}>
							{rectangleCenter ? (
								<Popup>
									Lat: {rectangleCenter.lat}
									<br />
									Long: {rectangleCenter?.lng}
								</Popup>
							) : null}
						</Rectangle>
					) : null}
				</MapContainer>
			</div>
		</>
	)
}

export default MapScreen
