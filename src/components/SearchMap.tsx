import React, { ChangeEvent, FC, ReactEventHandler, ReactNode } from "react"

const SearchMap: FC<{
	onSubmit: ReactEventHandler<HTMLFormElement>
	setSearchQuery: React.Dispatch<React.SetStateAction<string | undefined>>
}> = ({ onSubmit, setSearchQuery }) => {
	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		setSearchQuery(e.target.value)
	}

	return (
		<form onSubmit={onSubmit} className="w-full max-w-lg">
			<div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-5 h-5 absolute ml-3 pointer-events-none"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>

				<input
					type="text"
					name="search"
					autoComplete="off"
					aria-label="Search location..."
					placeholder="Search location..."
					onChange={onChangeSearch}
					className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500"
				/>
			</div>
		</form>
	)
}

export default SearchMap
