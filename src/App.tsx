import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import RequireAuth from "./components/Auth/RequireAuth";
import useToken from "./hooks/useToken";
import LoginScreen from "./pages/Login";
import MapPage, { MapContext } from "./pages/MapPage";
import MapRoutes from "./routes/MapRoutes";

export default function App() {
  const [token, setToken] = useToken();
  return (
    <Router>
      {/* <Map /> */}
      <MapRoutes />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        {/* {!token ? <Route path="/" element={<Navigate to="/login" />} /> : null} */}
      </Routes>
    </Router>
  );
}
