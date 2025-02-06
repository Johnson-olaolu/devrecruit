import express from "express";
import isAuthenticated from "../middleware/authMiddleware";
import userRoutes from "../user/user.routes";
import orderRoutes from "../order/order.routes";
import { loginUser, registerUser } from "../user/user.controller";
import { loginValidator, registerValidator } from "../validation/user.validation";

export const registerRoutes = (app: express.Application) => {
  app.post("/api/login", loginValidator, loginUser);
  app.post("/api/user", registerValidator, registerUser);
  app.use("/api/user", isAuthenticated, userRoutes);
  app.use("/api/order", isAuthenticated, orderRoutes);
};
