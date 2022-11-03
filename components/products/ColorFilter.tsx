import React, { FC, useMemo, useState } from "react"
import { Product } from "../../ts/interfaces/product.interface"

interface Props {
	products: Product[]
}
const ColorFilter: React.FC<Props> = ({ products }) => {
	const [selected, setSelected] = useState<Set<string>>(new Set())

	const colors = useMemo(() => {
		const buffer: Set<string> = new Set()

		for (let product of products) {
			buffer.add(product.color)
		}

		return Array.from(buffer)
	}, [products])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked
		const color = e.target.value

		const draft = structuredClone(selected)
		if (isChecked) draft.add(color)
		else draft.delete(color)

		setSelected(draft)
	}

	console.log({ selected })

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
