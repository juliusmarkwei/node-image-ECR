import { Request, Response } from "express";
import ProductModel from "../models/product";

export const getProducts = (req: Request, res: Response) => {
	ProductModel.getAll((err: any, products: any) => {
		if (err) return res.status(500).json({ error: "Database error" });
		res.status(200).json(products);
	});
};

export const createProduct = (req: Request, res: Response) => {
	const { name, price, description, stock } = req.body;
	ProductModel.create(
		{ name, price, description, stock },
		(err: any, product: any) => {
			if (err)
				return res
					.status(400)
					.json({ error: "ProductModel creation failed" });
			res.status(201).json(product);
		}
	);
};
