import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { getUserFromCacheOrDb } from "../user/user.controller";

const isAuthenticated = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = req.headers.authorization;

  if (!accessToken || !accessToken.startsWith("Bearer")) {
    throw new AppError("Authentication Invalid", 401);
  }

  accessToken = accessToken.split(" ")[1];
  try {
    const payload: any = jwt.verify(accessToken, process.env.JWT_SECRET || "");
    const user = await getUserFromCacheOrDb(payload.id);
    (req as any).user = user;
    next();
  } catch (error: any) {
    const message = error.name === "TokenExpiredError" ? error.message : "Authentication Invalid";
    throw new AppError(message, 401);
  }
});

export default isAuthenticated;
