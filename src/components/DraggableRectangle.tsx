// @ts-nocheck
import React from "react"
import { GeoJSON } from "react-leaflet"
import "leaflet-path-drag"

export const DraggableRectangle = (props: any) => {
	const geoJSONRef = React.useRef<any>(null)

	React.useEffect(() => {
		function __dragTransform(layer: any) {
			console.log("__dragTransform")
			layer._transform(props.transform.matrix)
		}

		function dragDropTransform(layer: any) {
			console.log("dragDropTransform")
			layer.dragging._transformPoints(props.transform.matrix)
			layer._updatePath()
			layer._project()
			layer._transform(null)
		}

		if (props.transform) {
			if (geoJSONRef.current) {
				geoJSONRef.current.eachLayer((layer: any) => {
					if (props.transform.end) dragDropTransform(layer)
					else __dragTransform(layer)
				})
			}
		}
	}, [props.transform])

	const handleFeature = (layer: any) => {
		layer.makeDraggable()
		layer.dragging.enable()
	}

	return (
		<GeoJSON
			ref={geoJSONRef}
			data={props.data.polygon}
			style={() => ({
				color: "#3388ff",
				weight: 3,
				opacity: 1,
			})}
			dragging={true}
			onEachFeature={(feature, layer) => handleFeature(layer)}
		></GeoJSON>
	)
}
