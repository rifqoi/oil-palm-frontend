import { SyntheticEvent, useState, useRef } from "react"
import LeafletMap from "../components/Map"
import Navbar from "../components/Navbar"
import SearchMap from "../components/SearchMap"
import L, { LatLngExpression } from "leaflet"
import { IAreaProps } from "../types/LatLong"
import { INominatimResult } from "../types/Nominatim"
import { Prediction } from "../types/ApiCall"
import type P5 from "p5"
import BoundingBox from "../components/BoundingBox"
import Sketch from "react-p5"

type ImageSize = {
	width: number | undefined
	height: number | undefined
}

const getAddressData = async (
	address: string | undefined
): Promise<INominatimResult[]> => {
	const url = `https://nominatim.openstreetmap.org/?&q=${address}&format=json&limit=1`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const getImage = async (lat: number, long: number) => {
	const url = "http://localhost:8000/api/v1/inference/image"
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			lat: lat,
			long: long,
		}),
		headers: new Headers({
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjcyODI5OTI2LCJpYXQiOjE2NzIyMjUxMjYsInN1YiI6InJpZnFvaXgifQ.IF9Tq3eXS74dM6qHqhlIgJeNai1fThbxeoRPbS1vYD8",
			"Content-Type": "application/json",
		}),
	})
	const imageBlob = await response.blob()
	const imageObjectURL = URL.createObjectURL(imageBlob)

	return imageObjectURL
}
const predictImage = async (lat: number, long: number) => {
	const url = "http://localhost:8000/api/v1/inference/predict"
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			lat: lat,
			long: long,
		}),
		headers: new Headers({
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjcyODI5OTI2LCJpYXQiOjE2NzIyMjUxMjYsInN1YiI6InJpZnFvaXgifQ.IF9Tq3eXS74dM6qHqhlIgJeNai1fThbxeoRPbS1vYD8",
			"Content-Type": "application/json",
		}),
	})
	const data: Prediction = await response.json()

	return data
}

const MainScreen = () => {
	const mapRef = useRef<L.Map>(null)
	const imgRef = useRef<HTMLImageElement>(null)
	const [predictedImage, setPredictedImage] = useState<string | null>(null)
	const [prediction, setPrediction] = useState<Prediction | undefined>()
	const [latLong, setLatLong] = useState<IAreaProps>()
	const [buttonLatLong, setButtonLatLong] = useState<IAreaProps>()
	const [searchQuery, setSearchQuery] = useState<string | undefined>()
	const [locationFound, setLocationFound] = useState<boolean | null>(null)
	const [imageSize, setImageSize] = useState<ImageSize | null>(null)

	const setup = (p5: P5, canvasParentRef: Element) => {
		const width = imageSize?.width as number
		const height = imageSize?.height as number
		console.log(width, height)
		console.log(prediction?.coco_bbox)
		p5.createCanvas(width, height).parent(canvasParentRef)
	}

	const drawResult = (object: P5) => {
		drawBoundingBox(object)
		// drawLabel(object)
	}

	// draw bounding box around the detected object
	const drawBoundingBox = (p5: P5) => {
		// Sets the color used to draw lines.
		p5.stroke("red")
		// width of the stroke
		p5.strokeWeight(2)
		// Disables filling geometry
		p5.noFill()
		// draw an rectangle
		// x and y are the coordinates of upper-left corner, followed by width and height
		for (let i = 0; i < prediction!.coco_bbox.length; i++) {
			if (i == 10) {
				break
			}
			p5.rect(
				prediction!.coco_bbox[i][0],
				prediction!.coco_bbox[i][1],
				prediction!.coco_bbox[i][2],
				prediction!.coco_bbox[i][3]
			)
		}
		// prediction!.coco_bbox.map((data, i) => {
		// 	// x, y, w, h
		// 	p5.rect(data[0], data[1], data[2], data[3])
		// })
	}

	const onPredict = async (e: SyntheticEvent) => {
		e.preventDefault()
		if (latLong !== null || latLong !== undefined) {
			setButtonLatLong(latLong)
		}

		const lat = latLong?.center.lat as number
		const long = latLong?.center.lng as number
		predictImage(lat, long).then((data) => {
			setPrediction(data)

			const width = imgRef.current?.clientWidth as number
			const height = imgRef.current?.clientHeight as number
			setImageSize({ width: width, height: height })
		})

		getImage(lat, long).then((data) => {
			setPredictedImage(data)
		})
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
			<Navbar></Navbar>
			<div className="container mx-auto">
				<div className="container flex flex-col  ml-12">
					<div className="">
						<SearchMap
							setSearchQuery={setSearchQuery}
							onSubmit={onSearch}
						></SearchMap>
					</div>
					{locationFound === false ? (
						<p className="text-red-500 text-sm mt-2">Location not found</p>
					) : null}

					<div className="py-3 flex">
						<LeafletMap
							setLatLong={setLatLong}
							center={[-6.2, 106.816666]}
							mapRef={mapRef}
							zoom={18}
						>
							<></>
						</LeafletMap>
					</div>
					<div className="flex">
						<button
							onClick={onPredict}
							className="py-2 px-4 bg-brightRed hover:bg-brightRedLight rounded-md text-white text-sm"
						>
							Predict
						</button>
					</div>
					{buttonLatLong ? (
						<h1 className="items-center justify-center">
							{JSON.stringify(buttonLatLong)}
						</h1>
					) : null}
					<div className="container bg-red-100 flex w-[640px] py-4">
						<div className="container relative inline-block">
							{predictedImage ? (
								<img ref={imgRef} src={predictedImage} className="w-full" />
							) : null}
							{prediction ? (
								<Sketch
									className="absolute top-0 left-0"
									setup={setup}
									draw={drawResult}
								/>
							) : null}
							{/* <div className="absolute border-brightRedLight border-2 top-10 left-0 w-10 h-5"></div> */}
							{/* <div className="absolute border-brightRedLight border-2 top-10 left-20 w-10 h-5"></div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainScreen
