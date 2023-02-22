import React from "react";
import {
  AttributionControl,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import useBreakpoints from "../../hooks/useBreakpoints";

type LeafletMapProps = {
  mapRef: React.MutableRefObject<L.Map | null>;
  children?: React.ReactNode | React.ReactNode[];
};

const LeafletMap: React.FC<LeafletMapProps> = ({ mapRef, children }) => {
  const { isXs } = useBreakpoints();
  return (
    <>
      <MapContainer
        zoomControl={false}
        ref={mapRef}
        center={[-6.471428154696355, 107.02629987019694]}
        // crs={L.CRS.EPSG4326}
        zoom={18}
        className="w-full h-screen z-0 absolute"
        maxZoom={21}
        attributionControl={false}
      >
        <ZoomControl position="topright" />
        {!isXs ? (
          <AttributionControl prefix={false} position="bottomleft" />
        ) : null}

        <TileLayer
          // url="https://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
          // url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
          // url="https://khms3.google.com/kh/v=941?x={x}&y={y}&z={z}"
          attribution="Imagery ©2023 CNES / Airbus, Maxar Technologies, Map data ©2023 "
          maxZoom={22}
        />
        {children}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
