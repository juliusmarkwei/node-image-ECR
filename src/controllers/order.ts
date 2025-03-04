import { Request, Response } from "express";
import OrderModel from "../models/order";
import ProductModel from "../models/product";

export const createOrder = (req: Request, res: Response) => {
	const { productId, quantity } = req.body;

	ProductModel.getAll((err: any, products: any[]) => {
		if (err) return res.status(500).json({ error: "Database error" });

		const product = products.find((p: { id: any }) => p.id === productId);
		if (!product)
			return res.status(404).json({ error: "Product not found" });

		const totalPrice = product.price * quantity;
		ProductModel.create(
			{ productId, quantity, totalPrice },
			(err: any, order: any) => {
				if (err) return res.status(400).json({ error: "Order failed" });
				res.status(201).json(order);
			}
		);
	});
};

export const getOrders = (req: Request, res: Response) => {
	OrderModel.getAll((err: any, orders: any) => {
		if (err) return res.status(500).json({ error: "Database error" });
		res.status(200).json(orders);
	});
};
