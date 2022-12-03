import type { GetStaticProps, NextPage } from "next"
import { useEffect, useMemo, useState } from "react"
import ColorFilter from "../components/products/ColorFilter"
import PriceRangeFilter from "../components/products/PriceRangeFilter"
import ProductCard from "../components/products/ProductCard"
import RatingFilter from "../components/products/RatingFilter"

import { Product } from "../ts/interfaces/product.interface"
import { Filter } from "../ts/types/product"

interface Props {
	products: Product[]
}

const INITIAL_FILTERS = {
	rating: [],
	color: [],
}

export const getStaticProps: GetStaticProps = async () => {
	const products = await fetch("http://localhost:5000/products").then(resp => resp.json())
	console.log("STATIC", products)
	return {
		props: {
			products,
		},
	}
}

const Home: NextPage<Props> = ({ products }) => {
	const [productsFiltered, setProductsFiltered] = useState<Product[]>([])

	const [filters, setFilters] = useState<Filter>(INITIAL_FILTERS)

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

	useEffect(() => {
		setProductsFiltered(products)
	}, [products])

	useEffect(() => {
		const colorFilter = filters.color.length ? filters.color : colors

		const ratingFilter = filters.rating.length ? filters.rating : ratings

		setProductsFiltered(products.filter(p => colorFilter.includes(p.color) && ratingFilter.includes(p.rating)))
	}, [filters, products])

	console.log({ productsFiltered })
	console.log({ filters })

	return (
		<main className='p-7 flex gap-7'>
			<aside>
				<PriceRangeFilter />

				<ColorFilter colors={colors} filters={filters} setFilters={setFilters} />

				<RatingFilter ratings={ratings} filters={filters} setFilters={setFilters} />
			</aside>
			<div>
				<p>Total: {productsFiltered.length}</p>
				<section className='grid grid-cols-products gap-3 p-3 flex-1'>
					{productsFiltered.map(product => (
						<article key={product.id}>
							<ProductCard product={product} />
						</article>
					))}
				</section>
			</div>
		</main>
	)
}

export default Home
