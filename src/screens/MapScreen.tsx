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

import L, {
	LeafletMouseEvent,
	LatLng,
	LatLngBounds,
	LatLngExpression,
	LatLngBoundsLiteral,
	DrawEvents,
	LayerEvent,
	layerGroup,
} from "leaflet"
import { Popup } from "react-leaflet"
import {
	checkUser,
	deleteTree,
	getTreesHistory,
	predictImage,
} from "../libs/api"
import Boxes from "../components/Boxes"
import SidebarTreeLocations from "../components/SidebarTreeLocations"
import SidebarPredictedTree from "../components/SidebarPredictedTree"
import { Polygon } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import TreeCard from "../components/TreeCard"
import { Navigate, useNavigate } from "react-router-dom"
import SidebarEditTree from "../components/SidebarEditTree"

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
	const [sbEditTree, setSBEditTree] = useState<boolean>(false)
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
	const [editDeleteID, setEditDeleteID] = useState<number | null>(null)
	const [editedTreeCenter, setEditedTreeCenter] = useState<LatLng>()
	const editControlRef = useRef<any>()

	let exampleRect = useRef<L.Rectangle | null>(null)
	const navigate = useNavigate()

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
		setSBEditTree(false)
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

	const onEditMounted = () => {
		editControlRef.current.drawControl._toolbars.draw._modes.rectangle.handler.enable()
	}

	const onEditStop = (e: SyntheticEvent) => {
		const id = editTreeID as number
		const editingRect = rectRefs.current?.get(id)

		rectRefs.current?.forEach((rect) => {
			rect.bindPopup(popupRefs.current?.get(id))
		})

		//@ts-ignore
		editingRect.editing.disable()
		setEditedTreeCenter(editingRect?.getCenter())

		setSBEditTree(false)
		setSBLoadTreeCard(!sbLoadTreeCard)
		setSBPredictTree(!sbLoadTreeCard)
		setSBTreeLocations(!sbLoadTreeCard)
	}

	const onEditStart = (id: number) => {
		const editingRect = rectRefs.current?.get(id)

		rectRefs.current?.forEach((rect) => {
			rect.unbindPopup()
		})

		console.log(editingRect)
		//@ts-ignore
		editingRect.editing.enable()
	}

	const drawSomething = (e: SyntheticEvent) => {
		// setEditTree(true)
		// exampleRect.current?.editing.enable()
		// if (mapRef) {
		// 	const map = mapRef.current as L.DrawMap
		// 	const rect = new L.Draw.Rectangle(map, {
		// 		//@ts-ignore
		// 		showArea: false,
		// 	})
		// 	map.on(L.Draw.Event.CREATED, (e: LayerEvent) => {
		// 		if (fgRef) {
		// 			const drawnItems = fgRef.current?.getLayers()
		// 			if (drawnItems) {
		// 				if (drawnItems.length > 1) {
		// 					drawnItems!.forEach((layer, index) => {
		// 						if (index > 0) return
		// 						fgRef.current?.removeLayer(layer)
		// 					})
		// 				}
		// 			}
		// 			const layer = e.layer as L.Rectangle
		// 			const featureGroup = fgRef.current as L.LayerGroup
		// 			layer.addTo(featureGroup)
		// 		}
		// 	})
		// 	rect.enable()
		// }
		// const drawnItems = fgRef.current?.getLayers()
	}
	checkUser().then((resp) => {
		if (!resp.ok) {
			navigate("/login")
		}
	})

	useEffect(() => {
		if (editTreeID) {
			setSBEditTree(true)
			setSBLoadTreeCard(!sbLoadTreeCard)
			setSBPredictTree(!sbLoadTreeCard)
			setSBTreeLocations(!sbLoadTreeCard)

			onEditStart(editTreeID)
			const myRect = rectRefs?.current?.get(editTreeID)
			myRect?.closePopup()
		}
	}, [editTreeID])

	useEffect(() => {
		if (deleteTreeID) {
			onDeleteFunction(deleteTreeID)
			const myRect = rectRefs?.current?.get(deleteTreeID)
			myRect?.closePopup()
		}
	}, [deleteTreeID])

	useEffect(() => {
		if (mapRef.current) {
			const map = mapRef.current

			if (!mouseMoveEvent) {
				setRectangleCenter(mouseRectRef.current?.getCenter())
				map.off("mousemove")
			}
		}
	}, [mouseMoveEvent, mapRef, mouseRectRef])
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
									setDeleteTreeID={setDeleteTreeID}
									setEditTreeID={setEditTreeID}
								/>
							) : null}
							{sbTreeLocations && popupRefs && rectRefs ? (
								<SidebarPredictedTree
									onPrevious={onPrevious}
									mapRef={mapRef}
									popupRef={popupRefs}
									rectRef={rectRefs}
									trees={trees}
									setDeleteTreeID={setDeleteTreeID}
									setEditTreeID={setEditTreeID}
								/>
							) : null}
							{sbEditTree ? (
								<SidebarEditTree
									onEditStop={onEditStop}
									onPrevious={onPrevious}
								/>
							) : null}
							{trees?.length === 0 && sbTreeLocations ? (
								<div>There are no predicted trees</div>
							) : null}
						</SidebarEmpty>
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
					crs={L.CRS.EPSG3857}
					zoom={18}
					className="w-full h-screen z-0 absolute"
					maxZoom={21}
					attributionControl={false}
				>
					<ZoomControl position="topright" />
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
									// Weird...
									//@ts-ignore
									showArea: false,
								},
							}}
						/>
						<Rectangle
							ref={(props) => {
								if (props) {
									props.on("click", (e: any) => {
										console.log(e)
										const layer = e.target

										console.log(layer.getCenter())
									})
									props.on(
										L.Draw.Event.EDITSTART,
										(e: LayerEvent) => {
											const layer = e.layer as L.Rectangle
											console.log(layer.getCenter())
										}
									)
									props.on(
										L.Draw.Event.EDITSTOP,
										(e: LayerEvent) => {
											const layer = e.layer as L.Rectangle
											console.log(layer.getCenter())
										}
									)
								}
								exampleRect.current = props
							}}
							bounds={[
								[-6.472634489929272, 107.02520310434704],
								[-6.4727091130627175, 107.02527686509495],
							]}
						/>
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
							setEditTreeID={setEditTreeID}
							setDeleteTreeID={setDeleteTreeID}
						/>
					) : null}
				</MapContainer>
			</div>
		</>
	)
}

export default MapScreen
