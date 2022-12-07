import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import leaflet from "leaflet"
import leaflet_draw from "leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
