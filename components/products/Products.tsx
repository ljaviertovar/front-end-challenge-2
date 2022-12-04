import { Product, Category } from "../../ts/interfaces/product.interface"
import ProductCard from "./ProductCard"
import { useEffect, useMemo, useState } from "react"
import Pagination from "../layout/Pagination"

const PAGE_SIZE = 10
interface Props {
	products: Product[]
	categories: Category[]
}

const Products = ({ products, categories }: Props) => {
	const [currentPage, setCurrentPage] = useState(0)

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE
		const lastPageIndex = firstPageIndex + PAGE_SIZE
		return products.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, products])

	useEffect(() => {
		setCurrentPage(1)
	}, [products])

	console.log({ currentTableData })

	return (
		<>
			<div className='grid grid-cols-products gap-3 p-3 flex-1'>
				{currentTableData.map(product => (
					<article key={product.id}>
						<ProductCard product={product} category={categories.filter(c => c.id === product.categoryId)[0]} />
					</article>
				))}
			</div>

			<Pagination
				currentPage={currentPage}
				totalCount={products.length}
				siblingCount={1}
				pageSize={PAGE_SIZE}
				onPageChange={(page: number) => setCurrentPage(page)}
			/>
		</>
	)
}

export default Products
