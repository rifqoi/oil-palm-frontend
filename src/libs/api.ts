// import useToken from "../hooks/useToken"
import { LatLng } from "leaflet";
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

export {
  getImage,
  predictImage,
  getTreesHistory,
  deleteTree,
  checkUser,
  getPredictionsHistory,
  getTotalTrees,
};
