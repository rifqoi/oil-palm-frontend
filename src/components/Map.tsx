import React, { FC, ReactNode, useRef, RefObject } from "react"
import { MapOptions, LayerEvent } from "leaflet"
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet"
import L from "leaflet"
import { EditControl } from "react-leaflet-draw"
import { LatLong, IAreaProps } from "../types/LatLong"
import { AttributionControl } from "react-leaflet"

const LeafletMap: FC<
	{
		children: ReactNode
		mapRef: RefObject<L.Map>
		center: [number, number]
		zoom: number
		setLatLong: React.Dispatch<React.SetStateAction<IAreaProps | undefined>>
	} & MapOptions
> = ({ children, mapRef, setLatLong, ...options }) => {
	const fgRef = useRef<L.FeatureGroup>(null)

	const onCreated = (e: LayerEvent) => {
		// if (e.layerType == "marker") {
		// 	const marker = e.layer as L.Marker
		// 	console.log(marker.getLatLng())
		// 	console.log(mapRef.current?.getZoom())
		// 	return
		// }
		const drawnItems = fgRef.current?.getLayers()
		if (drawnItems!.length > 1) {
			drawnItems!.forEach((layer, index) => {
				if (index > 0) return
				fgRef.current?.removeLayer(layer)
			})
		}

		const rect = e.layer as L.Rectangle
		const ll = rect.getLatLngs()[0]
		const drawCenter = rect.getCenter()
		const bounds = rect.getBounds()

		setLatLong({
			latlngs: ll as LatLong,
			center: drawCenter,
			bounds: bounds,
		})
	}

	const onDeleted = (e: LayerEvent) => {
		setLatLong(undefined)
	}

	return (
		<>
			<MapContainer
				className="h-[30rem] w-3/4 md:h-[30rem] md:w-3/4"
				maxZoom={20}
				ref={mapRef}
				attributionControl={false}
				{...options}
			>
				<AttributionControl prefix={false} />
				<FeatureGroup ref={fgRef}>
					<EditControl
						position="topleft"
						onCreated={onCreated}
						onDeleted={onDeleted}
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
					maxZoom={20}
				/>
				{children}
			</MapContainer>
		</>
	)
}

export default LeafletMap
