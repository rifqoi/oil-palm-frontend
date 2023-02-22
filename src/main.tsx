import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//
// Important to import !!!!!
import "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
