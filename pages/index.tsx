import type { GetStaticProps, NextPage } from "next"
import ProductCard from "../components/products/ProductCard"
import api from "../db/api"
import { Product } from "../ts/interfaces/Product.interface"

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
	console.log({ products })
	return (
		<main>
			<aside>Filters</aside>
			<section className='grid grid-cols-products gap-3 p-3'>
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
