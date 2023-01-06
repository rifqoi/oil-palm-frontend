import React, { SyntheticEvent, useState, useRef } from "react"
import LeafletMap from "../components/Map"
import Navbar from "../components/Navbar"
import SearchMap from "../components/SearchMap"
import L, { LatLngExpression } from "leaflet"
import { IAreaProps } from "../types/LatLong"
import { INominatimResult } from "../types/Nominatim"
import { Prediction } from "../types/ApiCall"
import BoundingBox from "../components/BoundingBox"
import { API_URL } from "../libs/Config"
import ImageSkeleton from "../components/ImageSkeleton"

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
	// const url = "http://34.87.112.231:7546/api/v1/inference/image"
	const url = `${API_URL}/api/v1/inference/image`
	const token = localStorage.getItem("access_token")
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			lat: lat,
			long: long,
		}),
		headers: new Headers({
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}),
	})
	const imageBlob = await response.blob()
	const imageObjectURL = URL.createObjectURL(imageBlob)

	return imageObjectURL
}
const predictImage = async (lat: number, long: number) => {
	// const url = "http://34.87.112.231:7546/api/v1/inference/predict"
	const url = `${API_URL}/api/v1/inference/predict`
	const token = localStorage.getItem("access_token")
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			lat: lat,
			long: long,
		}),
		headers: new Headers({
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}),
	})
	const data: Prediction = await response.json()

	return data
}

const MainScreen = () => {
	const mapRef = useRef<L.Map>(null)
	const imgRef = useRef<HTMLImageElement>(null)
	const [predictedImage, setPredictedImage] = useState<string | undefined>(
		undefined
	)
	const [prediction, setPrediction] = useState<Prediction | undefined>()
	const [latLong, setLatLong] = useState<IAreaProps>()
	const [buttonLatLong, setButtonLatLong] = useState<IAreaProps>()
	const [searchQuery, setSearchQuery] = useState<string | undefined>()
	const [locationFound, setLocationFound] = useState<boolean | null>(null)
	const [imageSize, setImageSize] = useState<ImageSize | null>(null)
	const [predicted, setPredicted] = useState<boolean>(false)
	const [imageLoad, setImageLoad] = useState<boolean | null>(null)

	const onPredict = async (e: SyntheticEvent) => {
		e.preventDefault()
		setImageLoad(true)
		if (latLong !== null || latLong !== undefined) {
			setButtonLatLong(latLong)
		}

		if (predicted === true) {
			setPrediction(undefined)
			setPredictedImage(undefined)
		}

		const lat = latLong?.center.lat as number
		const long = latLong?.center.lng as number
		console.log(latLong)
		predictImage(lat, long)
			.then((data) => {
				setPrediction(data)
				setPredicted(true)

				// const width = imgRef.current?.clientWidth as number
				// const height = imgRef.current?.clientHeight as number
				const width = 640
				const height = 640
				console.log(data)
				console.log(prediction)
				setImageSize({ width: width, height: height })
			})
			.then(() => setImageLoad(false))

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
					{/* {buttonLatLong ? ( */}
					{/* 	<h1 className="items-center justify-center"> */}
					{/* 		{JSON.stringify(buttonLatLong)} */}
					{/* 	</h1> */}
					{/* ) : null} */}
					{imageLoad === true && predictedImage === undefined ? (
						<ImageSkeleton className="py-3" />
					) : null}
					{prediction ? (
						<div className="container relative bg-red-100 w-[640px] h-[640px] my-5">
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
						</div>
					) : null}
					{prediction ? (
						<h2 className="py-4" key={prediction.count}>
							Count: {prediction.count}
						</h2>
					) : null}
				</div>
			</div>
		</>
	)
}

export default MainScreen
