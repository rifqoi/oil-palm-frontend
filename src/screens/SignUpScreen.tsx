import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

interface FormData {
	email: string
	name: string
	password: string
	validatePassword: string
}

const SignUpScreen = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		mode: "onChange",
	})

	const navigate = useNavigate()

	const password = watch("password")

	const onSubmit = (data: FormData) => {
		navigate("/")
	}

	// const onSubmit = handleSubmit(({ email, password, name }) => {
	// 	console.log(email, password, name)
	// })

	return (
		<>
			<Navbar center={true}></Navbar>
			<div className="min-h-screen flex flex-col my-20">
				<div className="max-w-3xl w-full mx-auto mt-4 bg-gray-50 p-8  md:border rounded-md border-brightRed ">
					<form
						action=""
						className="space-y-6"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="font-medium text-xl text-gray-800  ">
							Create your account
						</div>

						{/* Name */}
						<div>
							<label
								className={`text-sm font-bold text-gray-400 block ${
									errors.name
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
							>
								Name
							</label>
							<input
								type="text"
								placeholder="Enter your name here..."
								className={`w-full p-2 border  rounded mt-1 focus:outline-0 ${
									errors.name
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
								{...register("name", {
									required: {
										value: true,
										message: "Name is required",
									},
								})}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-2">
									{errors.name.message}
								</p>
							)}
						</div>

						{/* Email */}
						<div>
							<label
								className={`text-sm font-bold text-gray-400 block ${
									errors.email
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
							>
								Email
							</label>
							<input
								type="text"
								placeholder="Enter your email here..."
								className={`w-full p-2 border  rounded mt-1 focus:outline-0 ${
									errors.email
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
								{...register("email", {
									required: {
										value: true,
										message: "Email is required",
									},
									pattern: {
										value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/,
										message: "Email is invalid",
									},
								})}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-2">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password */}
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
									minLength: {
										value: 8,
										message: "Password must be greater than 8.",
									},
									maxLength: {
										value: 20,
										message: "Password must be lesser than 20.",
									},
									required: {
										value: true,
										message: "Password is required",
									},
								})}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm mt-2">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Validate Password */}
						<div>
							<label
								className={`text-sm font-bold text-gray-400 block ${
									errors.validatePassword
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
							>
								Confirm Password
							</label>
							<input
								type="password"
								placeholder="Enter your password here..."
								className={`w-full p-2 border border-brightRed rounded mt-1 focus:outline-0 ${
									errors.validatePassword
										? "text-red-500 border-red-500"
										: "border-brightRedLight"
								}`}
								{...register("validatePassword", {
									validate: (val: string) => {
										if (password !== val) {
											return "Password do not match!"
										}
									},
								})}
							/>
							{errors.validatePassword && (
								<p className="text-red-500 text-sm mt-2">
									{errors.validatePassword.message}
								</p>
							)}
						</div>
						<div>
							<button className="w-full py-2 px-4 bg-brightRed hover:bg-brightRedLight rounded-md text-white text-sm">
								Register
							</button>
						</div>
					</form>
					<div className=" ml-2 text-md text-gray-600 mt-5">
						Already have an account?
						<span>
							<a href="/login" className="text-blue-500">
								&nbsp;Login here
							</a>
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUpScreen
