import express from "express";
import cors from "cors";
import morgan from "morgan";
import orderRoutes from "./routes/order";
import productRoutes from "./routes/product";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.json({
		message:
			"E-Commerce API Built and deployed with Express & Elastic Beanstalk Deployment Lab Review",
		routes: ["/api/products", "/api/orders"],
	});
});
app.use("/api/products", orderRoutes);
app.use("/api/orders", productRoutes);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
