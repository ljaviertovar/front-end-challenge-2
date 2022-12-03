import { useEffect, useState } from "react"
import { Filter } from "../../ts/types/product"

interface Props {
	prices: { max: number; min: number }
	filters: Filter
	setFilters: (value: Filter) => void
}

const PriceRangeFilter = ({ prices, filters, setFilters }: Props) => {
	const [priceValue, setPriceValue] = useState("0")

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setPriceValue(e.currentTarget.value)
		setFilters({ ...filters, price: parseFloat(e.currentTarget.value) })
	}

	useEffect(() => {
		setPriceValue(prices.max.toString())
	}, [prices])

	return (
		<div className='p-2 border-solid border-2  rounded border-black-100'>
			<h4 className='text-xl font-bold'>Prices</h4>
			<div>
				<span>{prices.min.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
				<input
					type='range'
					id='price'
					name='price'
					min={prices.min}
					max={prices.max}
					value={priceValue}
					step='1'
					onChange={handleChange}
				/>
				<span>{parseFloat(priceValue).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
			</div>
		</div>
	)
}

export default PriceRangeFilter
