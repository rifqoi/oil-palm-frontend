import React, { useState } from "react"

import { BiChevronLeft } from "react-icons/bi"

const Sidebar = () => {
	const [toggle, setToggle] = useState(false)
	return (
		<div className={`sidebar-container`}>
			<div>
				<BiChevronLeft />
			</div>
		</div>
	)
}

export default Sidebar
