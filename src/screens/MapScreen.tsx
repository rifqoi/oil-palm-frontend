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
import "leaflet-path-drag"
import "leaflet-draw"

import L, {
	LeafletMouseEvent,
	LatLng,
	LatLngBounds,
	LatLngExpression,
	LatLngBoundsLiteral,
	DrawEvents,
} from "leaflet"
import { Popup } from "react-leaflet"
import { deleteTree, getTreesHistory, predictImage } from "../libs/api"
import Boxes from "../components/Boxes"
import SidebarTreeLocations from "../components/SidebarTreeLocations"
import SidebarPredictedTree from "../components/SidebarPredictedTree"
import { Polygon } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import TreeCard from "../components/TreeCard"

const getAddressData = async (
	address: string | undefined
): Promise<INominatimResult[]> => {
	const url = `https://nominatim.openstreetmap.org/?&q=${address}&format=json&limit=1`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const getPolygonPointFromBounds = (latLngBounds: L.LatLngBounds) => {
	const center = latLngBounds.getCenter()
	const latlngs = []

	latlngs.push(latLngBounds.getSouthWest()) //bottom left
	latlngs.push({ lat: latLngBounds.getSouth(), lng: center.lng }) //bottom center
	latlngs.push(latLngBounds.getSouthEast()) //bottom right
	latlngs.push({ lat: center.lat, lng: latLngBounds.getEast() }) // center right
	latlngs.push(latLngBounds.getNorthEast()) //top right
	latlngs.push({
		lat: latLngBounds.getNorth(),
		lng: latLngBounds.getCenter().lng,
	}) //top center
	latlngs.push(latLngBounds.getNorthWest()) //top left
	latlngs.push({
		lat: latLngBounds.getCenter().lat,
		lng: latLngBounds.getWest(),
	}) //center left

	return latlngs
}

type Transform = {
	matrix: any
	end: boolean
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
	const [sbPredictionHistory, setSBPredictionHistory] =
		useState<boolean>(false)
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
	const [loadTrees, setLoadTrees] = useState<boolean>(false)
	const [editTreeID, setEditTreeID] = useState<number | null>(null)

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

	const bounds = [
		[-6.470495720018312, 107.0268509108695],
		[-6.471394035295384, 107.02594683585174],
	] as LatLngBoundsLiteral

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
				console.log("rectmouse", rectangleMouse)
				setMouseMoveEvent(false)
			})
		}
	}

	const onEditTree = (e: SyntheticEvent) => {
		setSBLoadTreeCard(false)
		setLoadTrees(false)
		if (editTreeID) {
			return
		}

		// TODO: Update tree in db

		trees?.map((tree) => {
			if (tree.id === editTreeID) {
				// TODO: Update state of the tree.

				// TODO: Create new useState for the tree
				return
			}
		})
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
		const addressData: INominatimResult[] = await getAddressData(
			searchQuery
		)
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
			setLoadTrees(false)
		}

		if (predicted === true) {
			setPrediction(undefined)
		}

		const lat = rectangleCenter?.lat as number
		const long = rectangleCenter?.lng as number
		predictImage(lat, long).then((data) => {
			setPrediction(data)
			setPredicted(true)

			setTrees(data.trees)
			setLoadTrees(true)
			setLoading(false)
			setSBLoadTreeCard(true)
			console.log(popupRefs)
		})
	}

	const onTreeHistory = (e: SyntheticEvent) => {
		e.preventDefault()
		setSBMoveFromMain(true)
		setSBTreeLocations(true)
		if (trees) {
			setTrees(null)
			setLoadTrees(false)
		}

		getTreesHistory().then((tree) => {
			setTrees(tree)
			setLoadTrees(true)
		})
	}

	const [deleteTreeID, setDeleteTreeID] = useState<number | null>(null)
	const onDeleteFunction = (id: number) => {
		deleteTree(id).then((response) => {
			console.log(response)
			if (!response.ok) {
				console.log(response.json())
				return
			}

			const treeToDelete = trees?.findIndex(
				(tree) => tree.tree_id === id
			) as number
			console.log("treeToDel", treeToDelete)
			if (trees) {
				const newTrees = [...trees]
				newTrees.splice(treeToDelete, 1)
				setTrees(newTrees)
				rectRefs?.current?.delete(id)
				console.log(newTrees)
			}
		})
	}

	useEffect(() => {
		if (deleteTreeID) {
			onDeleteFunction(deleteTreeID)
			const myRect = rectRefs?.current?.get(deleteTreeID)
			myRect?.closePopup()
		}
	}, [deleteTreeID])

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
						<SidebarEmpty
							className={`py-5 ${closeSidebar ? "hidden" : ""}`}
						>
							{!sbPredictTree &&
							!sbPredictionHistory &&
							!sbTreeLocations ? (
								<SidebarMain
									className="h-screen"
									onPredictTree={onPredictTree}
									onTreeLocations={onTreeHistory}
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
									setTrees={setTrees}
									setDeleteTreeID={setDeleteTreeID}
								/>
							) : null}
							{sbTreeLocations && popupRefs && rectRefs ? (
								<SidebarPredictedTree
									onPrevious={onPrevious}
									mapRef={mapRef}
									popupRef={popupRefs}
									rectRef={rectRefs}
									trees={trees}
									setTrees={setTrees}
									setDeleteTreeID={setDeleteTreeID}
								/>
							) : null}
							{trees?.length === 0 && sbTreeLocations ? (
								<div>There are no predicted trees</div>
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
						url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
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
					{loadTrees && trees ? (
						<Boxes
							rectRefs={rectRefs}
							popupRefs={popupRefs}
							trees={trees}
							setTrees={setTrees}
							setDeleteTreeID={setDeleteTreeID}
						/>
					) : null}
				</MapContainer>
			</div>
		</>
	)
}

export default MapScreen
