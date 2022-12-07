import L from "leaflet"
export type LatLong = L.LatLng[] | L.LatLng[][] | L.LatLng[][][]

export interface IAreaProps {
	latlngs: LatLong
	center: L.LatLng
	bounds: L.LatLngBounds
}
