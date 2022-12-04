import { url } from "inspector"
import { useState } from "react"
import { Category } from "../../ts/interfaces/product.interface"
import { Filter } from "../../ts/types/product"

interface Props {
	category: Category
	filters: Filter
	setFilters: (value: Filter) => void
}

const CategoryCard = ({ category, filters, setFilters }: Props) => {
	const [selected, setSelected] = useState(false)

	const setfilterCategory = () => {
		if (filters.category.includes(category.id)) {
			setFilters({ ...filters, category: filters.category.filter(c => c !== category.id) })
			setSelected(false)
		} else {
			const categoriesSelected = filters.category
			categoriesSelected.push(category.id)
			setFilters({ ...filters, category: categoriesSelected })
			setSelected(true)
		}
	}

	return (
		<div
			className={`${
				selected && "text-black border-yellow-500"
			} p-7 text-center font-bold text-slate-50/100 cursor-pointer rounded border-solid border-4 `}
			style={{ backgroundImage: `url(${category.image})`, backgroundSize: "cover" }}
			onClick={() => setfilterCategory()}
		>
			{category.name}
		</div>
	)
}

export default CategoryCard
