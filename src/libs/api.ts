// import useToken from "../hooks/useToken"
import { LatLng } from "leaflet";
import { Area } from "../types/Area";
import { GeoJSONFeature } from "../types/GeoJSONFeature";
import { Prediction, TotalTrees, Tree } from "../types/Tree";
import { API_URL } from "./config";

const getImage = async (lat: number, long: number) => {
  // const url = "http://34.87.112.231:7546/api/v1/inference/image"
  const url = `${API_URL}/api/v1/inference/image`;
  const token = localStorage.getItem("access_token");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      lat: lat,
      long: long,
    }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });
  const imageBlob = await response.blob();
  const imageObjectURL = URL.createObjectURL(imageBlob);

  return imageObjectURL;
};
const predictImage = async (
  lat: number,
  long: number,
  nw_bounds: LatLng,
  se_bounds: LatLng
) => {
  // const url = "http://34.87.112.231:7546/api/v1/inference/predict"
  const url = `${API_URL}/api/v1/inference/predict`;
  const token = localStorage.getItem("access_token");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      lat: lat,
      long: long,
      nw_bounds: [nw_bounds.lat, nw_bounds.lng],
      se_bounds: [se_bounds.lat, se_bounds.lng],
    }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const data: Prediction = await response.json();

  return data;
};

const getTreesHistory = async (): Promise<Tree[]> => {
  const url = `${API_URL}/api/v1/inference/trees`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const data: Tree[] = await response.json();
  return data;
};

const getPredictionByID = async (id: number): Promise<Prediction> => {
  const url = `${API_URL}/api/v1/inference/predictions/${id}`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const data: Prediction = await response.json();
  return data;
};

const getPredictionsHistory = async (): Promise<Prediction[]> => {
  const url = `${API_URL}/api/v1/inference/predictions`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const data: Prediction[] = await response.json();
  return data;
};

const updateTreeByID = async (id: number, obj_in: any): Promise<Tree> => {
  const url = `${API_URL}/api/v1/inference/trees/edit/${id}`;
  const token = localStorage.getItem("access_token");
  console.log(obj_in);

  const response = await fetch(url, {
    method: "PUT",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(obj_in),
  });

  const data: Tree = await response.json();
  return data;
};

const getPredictionsByID = async (id: number): Promise<Prediction> => {
  const url = `${API_URL}/api/v1/inference/predictions/${id}`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const data: Prediction = await response.json();
  return data;
};

const getTotalTrees = async (): Promise<TotalTrees> => {
  const url = `${API_URL}/api/v1/inference/total-trees`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const data: TotalTrees = await response.json();
  return data;
};

const deleteTree = async (id: number): Promise<Response> => {
  const url = `${API_URL}/api/v1/inference/trees/delete/${id}`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  return response;
};

async function checkUser() {
  const url = `${API_URL}/api/v1/auth/me`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  return response;
}

async function insertArea(
  center_lat: number,
  center_long: number,
  geojson: string
) {
  const url = `${API_URL}/api/v1/areas`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      center_lat,
      center_long,
      geojson,
    }),
  });

  return response;
}

export type AreaResponse = {
  id: number;
  user_id: number;
  center_lat: number;
  center_long: number;
  geojson: GeoJSONFeature;
  total_trees: number;
  created_at: Date;
};

async function getAllAreas() {
  const url = `${API_URL}/api/v1/areas`;
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const jsonRes: AreaResponse[] = await response.json();

  const areas: Area[] = [];
  jsonRes.map((v) => {
    const area: Area = {
      id: v.id,
      center: new LatLng(v.center_lat, v.center_long),
      geojson: v.geojson,
      totalTrees: v.total_trees,
      createdAt: v.created_at,
    };

    areas.push(area);
  });

  return areas;
}

export {
  getImage,
  predictImage,
  getTreesHistory,
  deleteTree,
  checkUser,
  getPredictionsHistory,
  getTotalTrees,
  getPredictionsByID,
  updateTreeByID,
  getPredictionByID,
  insertArea,
  getAllAreas,
};
