import { db } from "../config/db";

interface ProductInterface {
	id?: number;
	name: string;
	price: number;
	description: string;
	stock: number;
}

class ProductModel {
	static getAll(callback: any) {
		db.all("SELECT * FROM products", [], (err, rows) =>
			callback(err, rows)
		);
	}

	static create(
		{ name, price, description, stock }: any,
		callback: (err: Error | null, result: ProductInterface) => void
	) {
		db.run(
			"INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)",
			[name, price, description, stock],
			function (err) {
				callback(err, {
					id: this.lastID,
					name,
					price,
					description,
					stock,
				});
			}
		);
	}
}

export default ProductModel;
