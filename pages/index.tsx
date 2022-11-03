import type { GetStaticProps, NextPage } from "next"
import ColorFilter from "../components/products/ColorFilter"
import PriceRangeFilter from "../components/products/PriceRangeFilter"
import ProductCard from "../components/products/ProductCard"
import RatingFilter from "../components/products/RatingFilter"
import api from "../db/api"
import { Product } from "../ts/interfaces/product.interface"

interface Props {
	products: Product[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const products = await api.product.list()

	return {
		props: {
			products,
		},
	}
}

const Home: NextPage<Props> = ({ products }) => {
	// console.log({ products })
	return (
		<main className='p-7 flex gap-7'>
			<aside>
				<PriceRangeFilter />
				<ColorFilter products={products} />
				<RatingFilter />
			</aside>
			<section className='grid grid-cols-products gap-3 p-3 flex-1'>
				{products.map(product => (
					<article key={product.id}>
						<ProductCard product={product} />
					</article>
				))}
			</section>
		</main>
	)
}

export default Home
