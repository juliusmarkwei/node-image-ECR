import { createOrder, getOrders } from "../controllers/order";
import { Router } from "express";

const orderRoutes = Router();

orderRoutes.post("/", createOrder);
orderRoutes.get("/", getOrders);

export default orderRoutes;
