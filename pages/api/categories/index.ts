import type { NextApiRequest, NextApiResponse } from "next"
import { Category } from "../../../ts/interfaces/product.interface"

type Data = { message: string } | { categories: Category[] } | Category[]

import categories from "../../../db/categories-seed.json"

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getCategories(req, res)

		default:
			return res.status(500).json({ message: "Bad request" })
	}
}

const getCategories = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		// const categories = await fetch("http://localhost:5000/categories").then(resp => resp.json())

		return res.status(200).json(categories)
	} catch (error) {
		return res.status(500).json({ message: "Error server" })
	}
}
