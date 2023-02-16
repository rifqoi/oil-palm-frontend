import React, { SyntheticEvent, useState } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { MapContainer, TileLayer } from "react-leaflet"
import SidebarEmpty from "../components/SidebarEmpty"
import SidebarMain from "../components/SidebarMain"

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<button
				className="fixed top-0 right-0 m-4 p-2 bg-white rounded-full hover:bg-gray-300"
				onClick={toggleSidebar}
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>

			<div
				className={`${
					isOpen ? "block" : "hidden"
				} absolute top-0 right-0 bottom-0 bg-white w-64 p-4`}
			>
				{/* Your sidebar content goes here */}
			</div>
		</>
	)
}

const MapWithSidebar = () => {
	const position = [51.505, -0.09]
	const [closeSidebar, setCloseSidebar] = useState<boolean>()

	const onCloseSideBar = (e: SyntheticEvent) => {
		setCloseSidebar(!closeSidebar)
	}

	return (
		<>
			<SidebarEmpty className={`py-5 ${closeSidebar ? "hidden" : ""}`}>
				<SidebarMain />
			</SidebarEmpty>
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
			<div className="h-screen">
				<MapContainer className="h-full w-full" zoom={13}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				</MapContainer>
				<Sidebar />
			</div>
		</>
	)
}

export default MapWithSidebar
