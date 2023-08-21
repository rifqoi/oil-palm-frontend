import { LatLng } from "leaflet";
import { GeoJSONFeature } from "./GeoJSONFeature";

export type Area = {
  id: number;
  geojson: GeoJSONFeature;
  totalTrees: number;
  center: LatLng;

  createdAt: Date | undefined;
};
