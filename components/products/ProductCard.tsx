/* eslint-disable @next/next/no-img-element */
import { Product, Category } from "../../ts/interfaces/product.interface"

interface Props {
	product: Product
	category: Category
}

const ProductCard: React.FC<Props> = ({ product, category }) => {
	return (
		<div className='flex flex-col gap-3 bg-slate-900 rounded'>
			<img className='rounded-t-sm' src={product.image} alt={product.name} />
			<div className='p-5'>
				<h3>{product.name}</h3>
				<p>{category.name}</p>
				<p>Rating: {"★".repeat(product.rating).padEnd(5, "☆")}</p>
				<p>color: {product.color}</p>
				<p>{product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
			</div>
		</div>
	)
}

export default ProductCard
