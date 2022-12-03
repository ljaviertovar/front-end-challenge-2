export interface Product {
	id: number
	name: string
	image: string
	color: string
	price: number
	currency: string
	releaseDate: string
	categoryId: number
	rating: number
}

export interface Category {
	id: number
	name: string
	image: string
}
