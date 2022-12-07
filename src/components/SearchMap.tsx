import React, { ChangeEvent, FC, ReactEventHandler } from "react"

const SearchMap: FC<{
	onSubmit: ReactEventHandler<HTMLFormElement>
	setSearchQuery: React.Dispatch<React.SetStateAction<string | undefined>>
}> = ({ onSubmit, setSearchQuery }) => {
	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="flex justify-center">
				<div className="mb-3 xl:w-96">
					<div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
						<input
							type="search"
							className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							placeholder="Search"
							aria-label="Search"
							aria-describedby="button-addon3"
							onChange={onChangeSearch}
						/>
						<button
							className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
							type="submit"
							id="button-addon3"
						>
							Search
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default SearchMap
