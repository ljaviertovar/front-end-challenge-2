import CategoryCard from "./CategoryCard"

import { Category } from "../../ts/interfaces/product.interface"
import { Filter } from "../../ts/types/product"

interface Props {
	categories: Category[]
	filters: Filter
	setFilters: (value: Filter) => void
}

const Categories = ({ categories, filters, setFilters }: Props) => {
	return (
		<>
			{categories.map(category => (
				<article key={category.id}>
					<CategoryCard category={category} filters={filters} setFilters={setFilters} />
				</article>
			))}
		</>
	)
}

export default Categories
