import React, { FC, ReactEventHandler, ReactNode, useState } from "react"

const SidebarEmpty: FC<{
	children: ReactNode
	className: string
}> = ({ children, className }) => {
	return (
		<>
			<div className={`${className}`}>{children}</div>
		</>
	)
}

export default SidebarEmpty
