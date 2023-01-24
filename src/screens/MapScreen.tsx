import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import Logo from "../assets/logo.png"
import {
	AttributionControl,
	TileLayer,
	Rectangle,
	FeatureGroup,
	MapContainer,
} from "react-leaflet"

import { INominatimResult } from "../types/Nominatim"
import { Prediction, Tree } from "../types/ApiCall"
import SidebarEmpty from "../components/SidebarEmpty"
import SidebarMain from "../components/SidebarMain"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import SearchMap from "../components/SearchMap"
import { ZoomControl } from "react-leaflet"
import SidebarPredictImage from "../components/SidebarPredictImage"

import {
	LeafletMouseEvent,
	LatLng,
	LatLngBounds,
	LatLngExpression,
} from "leaflet"
import { Popup } from "react-leaflet"
import { predictImage } from "../libs/api"
import Boxes from "../components/Boxes"
import SidebarTreeLocations from "../components/SidebarTreeLocations"
import SidebarPredictedTree from "../components/SidebarPredictedTree"

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
	const rectRefs = useRef<Map<number, L.Rectangle> | null>(null)
	const popupRefs = useRef<Map<number, L.Popup> | null>(null)
	const mouseRectRef = useRef<L.Rectangle>(null)
	const [closeSidebar, setCloseSidebar] = useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState<string | undefined>()
	const [sbPredictTree, setSBPredictTree] = useState<boolean>(false)
	const [sbPredictionHistory, setSBPredictionHistory] = useState<boolean>(false)
	const [sbTreeLocations, setSBTreeLocations] = useState<boolean>(false)
	const [sbMoveFromMain, setSBMoveFromMain] = useState<boolean>(false)
	const [locationFound, setLocationFound] = useState<boolean | null>(null)
	const [rectangleMouse, setRectangleMouse] = useState<LatLngBounds | null>(
		null
	)
	const [loading, setLoading] = useState<boolean>(false)
	const [rectangleCenter, setRectangleCenter] = useState<LatLng>()
	const [mouseMoveEvent, setMouseMoveEvent] = useState<boolean>(false)
	const [prediction, setPrediction] = useState<Prediction | undefined>()
	const [predicted, setPredicted] = useState<boolean>(false)
	const [sbLoadTreeCard, setSBLoadTreeCard] = useState<boolean>(false)
	const [trees, setTrees] = useState<Tree[] | null>(null)

	useEffect(() => {
		if (mapRef.current) {
			const map = mapRef.current

			if (!mouseMoveEvent) {
				setRectangleCenter(mouseRectRef.current?.getCenter())
				map.off("mousemove")
			}
		}
	}, [mouseMoveEvent, mapRef, mouseRectRef])

	const onPredictionHistory = (e: SyntheticEvent) => {
		setSBMoveFromMain(true)
		setSBPredictionHistory(true)
	}

	const onPredictTree = (e: SyntheticEvent) => {
		setSBMoveFromMain(true)
		setSBPredictTree(true)
	}

	const onSelectArea = (e: SyntheticEvent) => {
		if (rectangleCenter) {
			setRectangleCenter(undefined)
		}
		if (mapRef.current && sbMoveFromMain) {
			mapRef.current.on("mousemove", (e: LeafletMouseEvent) => {
				setMouseMoveEvent(true)
				setRectangleMouse(e.latlng.toBounds(100))
			})
			mapRef.current.on("click", (e: LeafletMouseEvent) => {
				setMouseMoveEvent(false)
			})
		}
	}

	const onCloseSideBar = (e: SyntheticEvent) => {
		setCloseSidebar(closeSidebar ? false : true)
	}

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
		setSBLoadTreeCard(false)
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

	const onPredict = async (e: SyntheticEvent) => {
		e.preventDefault()
		setRectangleMouse(null)
		setRectangleCenter(undefined)
		setLoading(true)

		if (trees) {
			setTrees(null)
		}

		if (predicted === true) {
			setPrediction(undefined)
		}

		const lat = rectangleCenter?.lat as number
		const long = rectangleCenter?.lng as number
		console.log(lat, long)
		predictImage(lat, long).then((data) => {
			setPrediction(data)
			setPredicted(true)

			setTrees(data.trees)
			setLoading(false)
			setSBLoadTreeCard(true)
			console.log(popupRefs)
		})
	}

	return (
		<>
			<div className="flex">
				<div
					className={`container flex bg-white z-50 relative ease-in-out  h-screen ${
						!sbMoveFromMain && "pt-5"
					} ${!closeSidebar ? "w-3/12 px-5" : "w-0"} duration-300 ${
						sbMoveFromMain && "overflow-scroll"
					}`}
				>
					<div className="w-full">
						{sbMoveFromMain ? null : (
							<img
								className="text-center mr-auto self-center h-5 sm:h-10"
								src={Logo}
								alt=""
							/>
						)}
						{/* <div className={`flex flex-col ${closeSidebar && "hidden"}`}> */}
						<SidebarEmpty className={`py-5 ${closeSidebar ? "hidden" : ""}`}>
							{!sbPredictTree && !sbPredictionHistory && !sbTreeLocations ? (
								<SidebarMain
									className="h-screen"
									onPredictTree={onPredictTree}
									onTreeLocations={onTreeLocations}
									onPredictionHistory={onPredictionHistory}
								/>
							) : null}
							{sbPredictTree && !sbLoadTreeCard ? (
								<SidebarPredictImage
									className="h-screen relative"
									trees={trees}
									loading={loading}
									onPredict={onPredict}
									onPrevious={onPrevious}
									rectangleCenter={rectangleCenter}
									setRectangleCenter={setRectangleCenter}
									setRectangleMouse={setRectangleMouse}
									onSelectArea={onSelectArea}
								/>
							) : null}
							{sbLoadTreeCard && popupRefs && rectRefs ? (
								<SidebarPredictedTree
									rectRef={rectRefs}
									popupRef={popupRefs}
									mapRef={mapRef}
									onPrevious={onPrevious}
									trees={trees}
								/>
							) : null}
							{sbTreeLocations ? (
								<SidebarTreeLocations onPrevious={onPrevious} />
							) : null}
						</SidebarEmpty>
						{/* <div className="items-start">asdasd</div> */}
						{/* </div> */}
					</div>
				</div>
				<div
					className="bg-sky-500 z-10 my-auto py-3 pl-2 pr-2 rounded-md left-4 cursor-pointer"
					onClick={onCloseSideBar}
				>
					{!closeSidebar ? (
						<AiOutlineArrowLeft className="text-white" />
					) : (
						<AiOutlineArrowRight className="text-white" />
					)}
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
					className="w-full h-screen z-0 absolute"
					maxZoom={21}
					attributionControl={false}
				>
					<AttributionControl prefix={false} />
					<FeatureGroup ref={fgRef}>
						<ZoomControl position="topright" />
					</FeatureGroup>
					)
					<TileLayer
						url="https://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
						attribution="Imagery ©2023 CNES / Airbus, Maxar Technologies, Map data ©2023 "
						maxZoom={22}
					/>
					{rectangleMouse ? (
						<Rectangle ref={mouseRectRef} bounds={rectangleMouse}>
							{rectangleCenter ? (
								<Popup>
									Lat: {rectangleCenter.lat}
									<br />
									Long: {rectangleCenter?.lng}
								</Popup>
							) : null}
						</Rectangle>
					) : null}
					{trees ? (
						<Boxes rectRefs={rectRefs} popupRefs={popupRefs} trees={trees} />
					) : null}
				</MapContainer>
			</div>
		</>
	)
}

export default MapScreen
