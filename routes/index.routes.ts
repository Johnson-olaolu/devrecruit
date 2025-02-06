import express from "express";
import isAuthenticated from "../middleware/authMiddleware";
import userRoutes from "../user/user.routes";
import orderRoutes from "../order/order.routes";
import { loginUser, registerUser } from "../user/user.controller";
import { loginValidator, registerValidator } from "../validation/user.validation";

export const registerRoutes = (app: express.Application) => {
  app.post("/login", loginValidator, loginUser);
  app.post("/register", registerValidator, registerUser);
  app.use("/user", isAuthenticated, userRoutes);
  app.use("/order", isAuthenticated, orderRoutes);
};
