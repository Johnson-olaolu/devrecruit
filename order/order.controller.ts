import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { AppError } from "../utils/errorHandler";
import { Request, Response } from "express";
import { Order } from "./models/order.model";

//Register User
export const createOrder = expressAsyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array().toString(), 400);
  }
  try {
    const { totalAmount, items, status } = req.body;
    const order = await Order.create({ totalAmount, items, status });
    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    throw new AppError("Error creating order", 500);
  }
});

export const getAllOrders = expressAsyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find();
  res.status(200).json({
    message: "Orders fetched successfully",
    data: orders,
  });
});

export const getTotalRevenue = expressAsyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ status: "completed" });
  const totalRevenue = orders.reduce((startValue, order) => order.totalAmount + startValue, 0);
  res.status(200).json({
    message: "Total revenue fetched successfully",
    data: totalRevenue,
  });
});

export const getOrderByStatus = expressAsyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array().toString(), 400);
  }
  const status = req.query.status;
  const orders = await Order.find({ status });
  res.status(200).json({
    message: "Orders fetched successfully",
    data: orders,
  });
});

export const getSingleOrder = expressAsyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError("Order not found", 404);
  }
});

export const updateOrder = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    const { totalAmount, items, status } = req.body;
    order.totalAmount = totalAmount;
    order.items = items;
    order.status = status;
    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    throw new AppError("Error updating order", 500);
  }
});

export const deleteOrder = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByIdAndDelete(orderId);
    if (order) {
      throw new AppError("Order not found", 404);
    }

    res.status(201).json({
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    throw new AppError("Error deleting order", 500);
  }
});
