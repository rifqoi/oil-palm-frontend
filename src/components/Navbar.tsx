import React from "react"
import Logo from "../assets/logo.png"

interface IProps {
	center?: boolean
	login?: boolean
}

const Navbar = ({ center, login }: IProps) => {
	return (
		// Navbar
		<nav className="relative container p-6 mx-auto">
			{/* Flex Container */}
			<div className="flex items-center justify-between">
				{/* Logo */}
				<div className="pt-2">
					<a href="/">
						<img className="h-8 mr-3 sm:h-12" src={Logo} alt="" />
					</a>
				</div>

				{/* Menu Items */}
				{center && (
					<div className="hidden md:flex md:items-center space-x-6">
						<a href="#" className="hover:text-darkGrayishBlue">
							Home
						</a>
						<a href="#" className="hover:text-darkGrayishBlue">
							About
						</a>
						<a href="#" className="hover:text-darkGrayishBlue">
							Oil Palm
						</a>
					</div>
				)}
				{/* Button */}
				{login && (
					<a
						className="hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full align-baseline hover:bg-brightRedLight"
						href="/login"
					>
						Login
					</a>
				)}
			</div>
		</nav>
	)
}

export default Navbar
