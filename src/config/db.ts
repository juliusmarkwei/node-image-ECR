import sqlite3 from "sqlite3";

// Create an in-memory database
export const db = new sqlite3.Database(":memory:", (err) => {
	if (err) {
		console.error("Failed to connect to SQLite:", err.message);
	} else {
		console.log("Connected to SQLite (Ephemeral)");
	}
});

// Create tables
db.serialize(() => {
	db.run(
		`CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      stock INTEGER
    )`
	);

	db.run(
		`CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      quantity INTEGER,
      total_price REAL,
      FOREIGN KEY(product_id) REFERENCES products(id)
    )`
	);
});
