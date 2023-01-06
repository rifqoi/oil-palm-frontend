import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Navbar from "../components/Navbar"
import { API_URL } from "../libs/Config"
import useToken from "../hooks/useToken"

type FormData = {
	username: string
	password: string
}

type LoginResponse = {
	access_token: string
	token_type: string
}

async function login(username: string, password: string) {
	const url = `${API_URL}/api/v1/auth/login`
	const response = await fetch(url, {
		method: "POST",
		body: new URLSearchParams({
			username: username,
			password: password,
		}),
		headers: new Headers({
			"Content-Type": "application/x-www-form-urlencoded",
		}),
	})

	if (!response.ok) {
		return null
	}

	const jsonResponse: LoginResponse = await response.json()

	return jsonResponse
}

const LoginScreen = () => {
	const {
		register,
		watch,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		mode: "onChange",
	})

	const [userFound, setUserFound] = useState<boolean | null>(null)
	const [token, setToken] = useToken()

	const navigate = useNavigate()

	const onSubmit = handleSubmit(({ username, password }) => {
		console.log(username, password)
		login(username, password).then((response: LoginResponse | null) => {
			if (response === null) {
				setUserFound(false)
				return
			}

			if (response?.access_token === undefined) {
				setUserFound(false)
				return
			}

			const accessToken = response?.access_token as string
			setToken(accessToken)
			navigate("/map")
		})
	})

	return (
		<>
			<Navbar center={true}></Navbar>
			<div className="min-h-screen flex flex-col my-20">
				<div className="max-w-3xl w-full mx-auto mt-4 bg-gray-50 p-8  md:border rounded-md border-brightRed ">
					<form action="" className="space-y-6" onSubmit={onSubmit}>
						<div>
							<div className="font-medium text-xl text-gray-800 py-5 ">
								Please sign in to continue!
							</div>
							<label
								className={`text-sm font-bold text-gray-400 block ${
									errors.username
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
							>
								Username
							</label>
							<input
								type="text"
								placeholder="Enter your email here..."
								className={`w-full p-2 border  rounded mt-1 focus:outline-0 ${
									errors.username
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
								{...register("username", {
									required: {
										value: true,
										message: "Username is required",
									},
									// pattern: {
									// 	value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,63})$/,
									// 	message: "Username is invalid",
									// },
								})}
							/>
							{errors.username && (
								<p className="text-red-500 text-sm mt-2">
									{errors.username.message}
								</p>
							)}
						</div>
						<div>
							<label
								className={`text-sm font-bold text-gray-400 block ${
									errors.password
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
							>
								Password
							</label>
							<input
								type="password"
								placeholder="Enter your password here..."
								className={`w-full p-2 border border-brightRed rounded mt-1 focus:outline-0 ${
									errors.password
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
								{...register("password", {
									// minLength: {
									// 	value: 8,
									// 	message: "Password must be greater than 8.",
									// },
									// maxLength: {
									// 	value: 20,
									// 	message: "Password must be lesser than 20.",
									// },
									required: {
										value: true,
										message: "Password is required",
									},
								})}
							/>
							{errors.password && userFound !== false ? (
								<p className="text-red-500 text-sm mt-2">
									{errors.password.message}
								</p>
							) : null}
							{userFound === false ? (
								<p className="text-red-500 text-sm mt-2">
									Incorrect username or password!
								</p>
							) : null}
						</div>
						<div className="flex items-center justify-end">
							{/* <div className="flex items-center"> */}
							{/* 	<input */}
							{/* 		type="checkbox" */}
							{/* 		id="remember" */}
							{/* 		className="h-4 w-4 text-blue-300 rounded" */}
							{/* 	/> */}
							{/* 	<label */}
							{/* 		className="ml-2 text-md text-gray-600 hover:cursor-pointer select-none" */}
							{/* 		htmlFor="remember" */}
							{/* 	> */}
							{/* 		Remember me */}
							{/* 	</label> */}
							{/* </div> */}
							<div>
								<a href="#" className="font-medium text-md text-blue-500">
									Forgot password?
								</a>
							</div>
						</div>
						<div>
							<button className="w-full py-2 px-4 bg-brightRed hover:bg-brightRedLight rounded-sm text-white text-sm">
								Login
							</button>
						</div>
					</form>
					<div className=" ml-2 text-md text-gray-600 mt-5">
						Don&apos;t have an account?
						<span>
							<a href="/signup" className="text-blue-500">
								&nbsp;Sign up
							</a>
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginScreen
