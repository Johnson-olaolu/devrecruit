import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderByStatus, getSingleOrder, getTotalRevenue, updateOrder } from "./order.controller";
import { createOrderValidator, getOrderByStatusValidator } from "../validation/order.validation";

const router = Router();

// Get all users
router.get("/", getAllOrders);

router.post("/", createOrderValidator, createOrder);

router.get("/status", getOrderByStatusValidator, getOrderByStatus);

router.get("/total-revenue", getTotalRevenue);

router.get("/:id", getSingleOrder);

router.put("/:id", updateOrder);

// Delete user
router.delete("/:id", deleteOrder);

export default router;
