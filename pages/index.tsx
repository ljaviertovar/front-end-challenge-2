import { useEffect, useState } from "react"
import type { GetStaticProps, NextPage } from "next"

import Products from "../components/products/Products"
import Categories from "../components/categories/Categories"
import ColorFilter from "../components/products/ColorFilter"
import PriceRangeFilter from "../components/products/PriceRangeFilter"
import RatingFilter from "../components/products/RatingFilter"
import NotFound from "../components/products/NotFound"

import useGetFiltersData from "../hooks/useGetFiltersData"

import { Product, Category } from "../ts/interfaces/product.interface"
import { Filter } from "../ts/types/product"

import products from "../db/products-seed.json"
import categories from "../db/categories-seed.json"

const INITIAL_FILTERS = {
	rating: [],
	color: [],
	price: 0,
	category: [],
}

interface Props {
	products: Product[]
	categories: Category[]
}

export const getStaticProps: GetStaticProps = async () => {
	// const products = await fetch("../  /api/products").then(resp => resp.json())

	// const categories = await fetch("http://localhost:3000/api/categories").then(resp => resp.json())

	return {
		props: {
			products,
			categories,
		},
	}
}

const Home: NextPage<Props> = ({ products, categories }) => {
	const [productsFiltered, setProductsFiltered] = useState<Product[]>([])
	const [filters, setFilters] = useState<Filter>(INITIAL_FILTERS)

	const { colors, ratings, prices, allCategories } = useGetFiltersData({ products, categories })

	useEffect(() => {
		const colorFilter = filters.color.length ? filters.color : colors

		const ratingFilter = filters.rating.length ? filters.rating : ratings

		const priceRange = { ...prices, max: filters.price <= prices.min ? prices.max : filters.price }

		const categoryfilter = filters.category.length ? filters.category : allCategories

		setProductsFiltered(
			products.filter(
				p =>
					colorFilter.includes(p.color) &&
					ratingFilter.includes(p.rating) &&
					p.price >= priceRange.min &&
					p.price <= priceRange.max &&
					categoryfilter.includes(p.categoryId)
			)
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters])

	return (
		<main className='p-7 bg-slate-800 text-slate-400'>
			<div className='p-2 border-solid border-2  rounded border-black-100 mb-3'>
				<h4 className='text-xl font-bold text-white'>Categories</h4>
				<section className='grid grid-cols-products gap-3 p-3 flex-1'>
					<Categories categories={categories} filters={filters} setFilters={setFilters} />
				</section>
			</div>
			<div className='flex gap-3'>
				<aside>
					<PriceRangeFilter prices={prices} filters={filters} setFilters={setFilters} />

					<ColorFilter colors={colors} filters={filters} setFilters={setFilters} />

					<RatingFilter ratings={ratings} filters={filters} setFilters={setFilters} />
				</aside>

				<div className='p-2 border-solid border-2  rounded border-black-100 flex-1'>
					<div className='flex gap-3 items-center'>
						<p className='px-3 text-xl font-bold text-white'>Total: {productsFiltered.length}</p>
						{/* <button
							type='button'
							className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'
							onClick={() => {
								setFilters(INITIAL_FILTERS)
							}}
						>
							clear filters
						</button> */}
					</div>
					<section>
						{!productsFiltered.length ? <NotFound /> : <Products products={productsFiltered} categories={categories} />}
					</section>
				</div>
			</div>
		</main>
	)
}

export default Home
