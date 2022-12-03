import type { NextApiRequest, NextApiResponse } from "next"
import { Product } from "../../../ts/interfaces/product.interface"

import httpHelper from "../../../helpers/httpHelper"
const api = httpHelper()

type Data = { message: string } | { products: Product[] }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getProducts(req, res)

		default:
			return res.status(400).json({ message: "Bad request" })
	}
}

const getProducts = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
	const products = await api.get("http://500/products")

	return res.status(200).json(products)
}
