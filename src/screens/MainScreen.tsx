import { SyntheticEvent, useState, useRef } from "react"
import LeafletMap from "../components/Map"
import Navbar from "../components/Navbar"
import SearchMap from "../components/SearchMap"
import L, { LatLngExpression } from "leaflet"
import { IAreaProps } from "../types/LatLong"
import { INominatimResult } from "../types/Nominatim"
import OilPalm from "../assets/oil-palm.png"

const getAddressData = async (
    address: string | undefined
): Promise<INominatimResult[]> => {
    const url = `https://nominatim.openstreetmap.org/?&q=${address}&format=json&limit=1`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const MainScreen = () => {
    const mapRef = useRef<L.Map>(null)
    const imgRef = useRef<HTMLDivElement>(null)
    const [latLong, setLatLong] = useState<IAreaProps>()
    const [buttonLatLong, setButtonLatLong] = useState<IAreaProps>()
    const [searchQuery, setSearchQuery] = useState<string | undefined>()
    const [locationFound, setLocationFound] = useState<boolean | null>(null)

    const onPredict = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(latLong)
        if (latLong !== null || latLong !== undefined) {
            setButtonLatLong(latLong)
        }
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
        console.log(imgRef.current?.getBoundingClientRect())

        const lat = parseFloat(addressData[0].lat)
        const lng = parseFloat(addressData[0].lon)

        const latlong = [lat, lng] as LatLngExpression
        mapRef.current?.flyTo(latlong, 18, {
            animate: true,
            duration: 2,
        })
    }

    const img = new Image()
    img.src = OilPalm

    return (
        <>
            <Navbar></Navbar>
            <div className="container mx-auto">
                <div className="container flex flex-col  ml-24">
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
                    {/* <div className="relative pb-10"> */}
                    {/* 	<img className="z-0" src={OilPalm} /> */}
                    {/* 	<div className="border-4 z-10 absolute border-black h-5 w-60"></div> */}
                    <div className="container bg-red-100 flex w-96 py-4">
                        <div ref={imgRef} className="container relative inline-block">
                            <img src={OilPalm} className="w-full" />
                            <div className="absolute border-brightRedLight border-2 top-10 left-0 w-10 h-5"></div>
                            <div className="absolute border-brightRedLight border-2 top-10 left-20 w-10 h-5"></div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default MainScreen
