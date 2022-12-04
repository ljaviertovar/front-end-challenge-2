import React from "react"
import { usePagination, DOTS } from "../../hooks/usePagination"
// import './pagination.scss';

interface Props {
	onPageChange: (value: number) => void
	totalCount: number
	siblingCount: number
	currentPage: number
	pageSize: number
}

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }: Props) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	})

	console.log({ onPageChange, totalCount, siblingCount, currentPage, pageSize })
	console.log({ paginationRange })

	if (paginationRange && (currentPage === 0 || paginationRange.length < 2)) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	let lastPage = paginationRange && paginationRange[paginationRange.length - 1]

	return (
		<ul className='flex items-center justify-between px-4 py-3 sm:px-6 max-w-xl m-auto'>
			<li
				className={`${
					currentPage === 1 && "pointer-events-none"
				} relative inline-flex items-center rounded-l-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
				onClick={onPrevious}
			>
				<div className='sr-only'>Prev</div>
			</li>
			{paginationRange &&
				paginationRange.map(pageNumber => {
					if (pageNumber === DOTS) {
						return <li key={pageNumber}>...</li>
					}

					return (
						<li
							key={pageNumber}
							className={`${
								pageNumber === currentPage
									? "relative z-10 inline-flex items-center border border-yellow-500 bg-yellow-500 px-4 py-2 text-sm font-medium text-black focus:z-20"
									: "relative inline-flex items-center border border-gray-500 px-4 py-2 text-sm font-medium hover:bg-yellow-500 hover:text-black hover:border-yellow-500 focus:z-20"
							}`}
							onClick={() => onPageChange(pageNumber as number)}
						>
							{pageNumber}
						</li>
					)
				})}
			<li
				className={`${
					currentPage === lastPage && "pointer-events-none"
				} relative inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
				onClick={onNext}
			>
				<div className='sr-only'>Next</div>
			</li>
		</ul>
	)
}

export default Pagination
