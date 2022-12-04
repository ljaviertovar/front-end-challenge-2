import type { NextApiRequest, NextApiResponse } from "next"
import { Product } from "../../../ts/interfaces/product.interface"

type Data = { message: string } | { products: Product[] } | Product[]

import products from "../../../db/products-seed.json"

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getProducts(req, res)

		default:
			return res.status(500).json({ message: "Bad request" })
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		// const products = await fetch("http://localhost:5000/products").then(resp => resp.json())

		return res.status(200).json(products)
	} catch (error) {
		return res.status(500).json({ message: "Error server" })
	}
}
