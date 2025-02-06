import { body, query } from "express-validator";

export const createOrderValidator = [
  body("totalAmount").isNumeric().withMessage("Total amount must be a number"),
  body("items").isArray({ min: 1 }).withMessage("Items must be an array with at least one item"),
  body("items.*.product").isString().notEmpty().withMessage("Each item must have a product name"),
  body("items.*.price").isNumeric().withMessage("Each item must have a numeric price"),
  body("status").isIn(["pending", "completed", "canceled"]).withMessage("Invalid status value"),
];

export const getOrderByStatusValidator = [query("status").isIn(["pending", "completed", "canceled"]).withMessage("Invalid status value")];
