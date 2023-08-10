interface Geometry {
  type: string;
  coordinates: number[] | number[][] | number[][][];
  // Add more properties if needed
}

interface Properties {
  [key: string]: any;
  // Define properties specific to your use case
}

interface GeoJSONFeature {
  type: "Feature";
  geometry: Geometry;
  properties: Properties;
}

export type { GeoJSONFeature, Geometry, Properties };
