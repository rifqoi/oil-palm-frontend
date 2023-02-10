import useToken from "../hooks/useToken"
import { Prediction, Tree } from "../types/ApiCall"
import { API_URL } from "./Config"

const getImage = async (lat: number, long: number) => {
	// const url = "http://34.87.112.231:7546/api/v1/inference/image"
	const url = `${API_URL}/api/v1/inference/image`
	const token = localStorage.getItem("access_token")
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
	})
	const imageBlob = await response.blob()
	const imageObjectURL = URL.createObjectURL(imageBlob)

	return imageObjectURL
}
const predictImage = async (lat: number, long: number) => {
	// const url = "http://34.87.112.231:7546/api/v1/inference/predict"
	const url = `${API_URL}/api/v1/inference/predict`
	const token = localStorage.getItem("access_token")
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
	})
	const data: Prediction = await response.json()

	return data
}

const getTreesHistory = async (): Promise<Tree[]> => {
	const url = `${API_URL}/api/v1/inference/trees`
	const token = localStorage.getItem("access_token")

	const response = await fetch(url, {
		method: "GET",
		headers: new Headers({
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}),
	})

	const data: Tree[] = await response.json()
	return data
}

const deleteTree = async(id: number): Promise<Response> => {
	const url = `${API_URL}/api/v1/inference/trees/delete/${id}`
	const token = localStorage.getItem("access_token")

	const response = await fetch(url, {
		method: "DELETE",
		headers: new Headers({
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}),
	})
	console.log(response.json())

	return response
}

export { getImage, predictImage, getTreesHistory, deleteTree }

