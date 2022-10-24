/* eslint-disable @next/next/no-img-element */
import { Product } from "../../ts/interfaces/product.interface"

interface Props {
	product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
	return (
		<div className='flex flex-col gap-3'>
			<img src={product.image} alt={product.name} />
			<h3>{product.name}</h3>
			<p>Rating: {product.rating}</p>
			<p>{product.price}</p>
		</div>
	)
}

export default ProductCard
