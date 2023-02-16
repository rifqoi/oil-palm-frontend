import React from "react"
import "./App.css"
import dotenv from "dotenv"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import SignUpScreen from "./screens/SignUpScreen"
import MainScreen from "./screens/MainScreen"
import NotFoundScreen from "./screens/NotFoundScreen"
import RequireAuth from "./components/RequireAuth"
import MapScreen from "./screens/MapScreen"
import MapWithSidebar from "./screens/Map2"

function App(): JSX.Element {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/signup" element={<SignUpScreen />} />
					{/* Proctected Route */}
					<Route element={<RequireAuth />}>
						<Route path="/map" element={<MainScreen />} />
						<Route path="/test" element={<MapScreen />} />
					</Route>
					<Route path="/test2" element={<MapWithSidebar />} />
					<Route path="*" element={<NotFoundScreen />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
