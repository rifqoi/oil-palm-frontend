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
					</Route>
					<Route path="*" element={<NotFoundScreen />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
