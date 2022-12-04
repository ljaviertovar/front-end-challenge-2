import { useState, useEffect } from "react"
import { Filter } from "../../ts/types/product"

interface Props {
	ratings: number[]
	filters: Filter
	setFilters: (value: Filter) => void
}

const RatingFilter = ({ ratings, filters, setFilters }: Props) => {
	const [selected, setSelected] = useState<Set<number>>(new Set())

	const setRatingFilter = (rating: number) => {
		const draft = structuredClone(selected)
		if (selected.has(rating)) draft.delete(rating)
		else draft.add(rating)

		setSelected(draft)
	}

	useEffect(() => {
		const ratingsSelected = Array.from(selected)
		if (!ratingsSelected) setFilters({ ...filters, rating: ratings })
		else setFilters({ ...filters, rating: ratingsSelected })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	return (
		<div className='p-2 border-solid border-2  rounded border-black-100'>
			<h4 className='text-xl font-bold text-white'>Ratings</h4>
			{ratings.map(r => (
				<p
					key={r}
					className={`${selected.has(r) && "text-yellow-500/100"} cursor-pointer`}
					onClick={() => setRatingFilter(r)}
				>
					{"★".repeat(r).padEnd(5, "☆")}
				</p>
			))}
		</div>
	)
}

export default RatingFilter
