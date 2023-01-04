import React, { SyntheticEvent, useState, useRef } from "react"
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
import BBox from "../components/BBox"

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
	const url = "http://34.87.112.231:7546/api/v1/inference/image"
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			lat: lat,
			long: long,
		}),
		headers: new Headers({
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjczNDUwMTc4LCJpYXQiOjE2NzI4NDUzNzgsInN1YiI6InJpZnFpIn0.NSki-Tcl21lhB3ZHivOMcEU4nbEluRuJAytk8dxT8wQ",
			"Content-Type": "application/json",
		}),
	})
	const imageBlob = await response.blob()
	const imageObjectURL = URL.createObjectURL(imageBlob)

	return imageObjectURL
}
const predictImage = async (lat: number, long: number) => {
	const url = "http://34.87.112.231:7546/api/v1/inference/predict"
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			lat: lat,
			long: long,
		}),
		headers: new Headers({
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjczNDUwMTc4LCJpYXQiOjE2NzI4NDUzNzgsInN1YiI6InJpZnFpIn0.NSki-Tcl21lhB3ZHivOMcEU4nbEluRuJAytk8dxT8wQ",
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

	const onPredict = async (e: SyntheticEvent) => {
		e.preventDefault()
		if (latLong !== null || latLong !== undefined) {
			setButtonLatLong(latLong)
		}

		const lat = latLong?.center.lat as number
		const long = latLong?.center.lng as number
		predictImage(lat, long).then((data) => {
			setPrediction(data)

			// const width = imgRef.current?.clientWidth as number
			// const height = imgRef.current?.clientHeight as number
			const width = 640
			const height = 640
			console.log(data)
			console.log(prediction)
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
					<div className="container relative bg-red-100 w-[640px]">
						<div className="container absolute top-0 left-0 inline-block">
							{predictedImage ? (
								<img
									ref={imgRef}
									src={predictedImage}
									className="absolute top-0 left-0 w-full"
								/>
							) : null}
							{/* <img ref={imgRef} src={predictedImage} className="w-full" /> */}
							{prediction ? (
								<BoundingBox
									img_width={imageSize?.width}
									img_height={imageSize?.height}
									prediction_data={prediction}
								/>
							) : null}
							{prediction ? <div>Count: {prediction.count}</div> : null}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainScreen
