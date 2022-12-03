import React, { useEffect, useMemo, useState } from "react"
import { Filter } from "../../ts/types/product"

interface Props {
	colors: string[]
	filters: Filter
	setFilters: (value: Filter) => void
}
const ColorFilter: React.FC<Props> = ({ colors, filters, setFilters }) => {
	const [selected, setSelected] = useState<Set<string>>(new Set())

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked
		const color = e.target.value

		const draft = structuredClone(selected)
		if (isChecked) draft.add(color)
		else draft.delete(color)

		setSelected(draft)
	}

	useEffect(() => {
		const colorsSelected = Array.from(selected)
		if (!colorsSelected) setFilters({ ...filters, color: colors })
		else setFilters({ ...filters, color: colorsSelected })
	}, [selected])

	return (
		<div className='p-2 border-solid border-2  rounded border-black-100'>
			<h4 className='text-xl font-bold'>Colors</h4>
			<ul>
				{colors.map(color => (
					<li key={color} className='flex gap-2 items-center'>
						<input name='color' type='checkbox' value={color} onChange={handleChange} />
						<label>{color}</label>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ColorFilter
