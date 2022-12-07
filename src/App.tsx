import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import SignUpScreen from "./screens/SignUpScreen"
import MainScreen from "./screens/MainScreen"

function App(): JSX.Element {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/signup" element={<SignUpScreen />} />
					<Route path="/map" element={<MainScreen />} />
				</Routes>
			</Router>
		</>
	)
}

/*
 * "/login" => {
 *   <Navbar />
 *   <LoginScreen />
 * }
 * "/" => {
 *   <Navbar center={true} login={true} />
 *   <HomeScreen />
 * }
 * */

export default App
