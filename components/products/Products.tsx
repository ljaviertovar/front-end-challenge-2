import { Product, Category } from "../../ts/interfaces/product.interface"
import ProductCard from "./ProductCard"

interface Props {
	products: Product[]
	categories: Category[]
}

const Products = ({ products, categories }: Props) => {
	return (
		<>
			{products.map(product => (
				<article key={product.id}>
					<ProductCard product={product} category={categories.filter(c => c.id === product.categoryId)[0]} />
				</article>
			))}
		</>
	)
}

export default Products
