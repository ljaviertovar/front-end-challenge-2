import { useMemo } from "react"
import { Product, Category } from "../ts/interfaces/product.interface"

interface Props {
	products: Product[]
	categories: Category[]
}

const useGetFiltersData = ({ products, categories }: Props) => {
	const colors = useMemo(() => {
		const buffer: Set<string> = new Set()

		for (let product of products) {
			buffer.add(product.color)
		}

		return Array.from(buffer)
	}, [products])

	const ratings = useMemo(() => {
		const buffer: Set<number> = new Set()

		for (let product of products) {
			buffer.add(product.rating)
		}

		return Array.from(buffer).sort()
	}, [products])

	const prices = useMemo(() => {
		const prices = products.map(r => r.price)
		return {
			max: Math.max(...prices),
			min: Math.min(...prices),
		}
	}, [products])

	const allCategories = useMemo(() => {
		const buffer: Set<number> = new Set()

		for (let category of categories) {
			buffer.add(category.id)
		}

		return Array.from(buffer)
	}, [categories])

	return { colors, ratings, prices, allCategories }
}

export default useGetFiltersData
