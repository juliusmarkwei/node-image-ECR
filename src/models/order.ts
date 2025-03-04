import { db } from "../config/db";

interface OrderInterface {
	id: number;
	productId: number;
	quantity: number;
	totalPrice: number;
}

class OrderModel {
	static getAll(callback: any) {
		db.all("SELECT * FROM orders", [], (err, rows) => callback(err, rows));
	}

	static create(
		{ productId, quantity, totalPrice }: OrderInterface,
		callback: any
	) {
		db.run(
			"INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)",
			[productId, quantity, totalPrice],
			function (err) {
				callback(err, {
					id: this.lastID,
					productId,
					quantity,
					totalPrice,
				});
			}
		);
	}
}

export default OrderModel;
