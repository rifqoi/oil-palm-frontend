import { useState } from "react"

export default function useToken() {
	const getToken = () => {
		const tokenString = localStorage.getItem("access_token")
		return tokenString
	}

	const [token, setToken] = useState(getToken())

	const saveToken = (userToken: string) => {
		localStorage.setItem("access_token", userToken)
		setToken(userToken)
	}

	return [token, saveToken] as const
}
