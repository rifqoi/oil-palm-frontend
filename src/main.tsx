import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//
// Important to import !!!!!
import "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
