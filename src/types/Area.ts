import { LatLngTuple } from "leaflet";
import { GeoJSONFeature } from "./GeoJSONFeature";

export type Area = {
  id: number;
  geoJSON: GeoJSONFeature;
  totalTrees: number;
  center: LatLngTuple;
};
