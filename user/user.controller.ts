import { NextFunction, Request, Response } from "express";
import { IUser, User } from "./models/user.model"; // Assuming you have a User model
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import redisClient from "../config/redis.config";

//Register User
export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array().toString(), 400);
  }
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ email, name, password });
    const signedInUser = createAccessToken(user);
    res.status(201).json({
      message: "User created successfully",
      data: signedInUser,
    });
  } catch (error) {
    throw new AppError("Error creating User", 500);
  }
});

//login User
export const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array().toString(), 400);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 404);
  }
  if (await user?.comparePassword(password)) {
    throw new AppError("Invalid email or password");
  }

  const signedInUser = createAccessToken(user);
  res.status(200).json({
    message: "User logged in successfully",
    data: signedInUser,
  });
});

const createAccessToken = (user: IUser) => {
  const body = { id: user._id, email: user.email };
  const token = jwt.sign(body, process.env.JWT_SECRET || "", {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d",
  });
  return {
    token,
    user,
  };
};

// Get all users
export const getAllUsers = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    throw new AppError("Error fetching users", 500);
  }
});

// Get active user (current logged-in user)
export const getActiveUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as { email: string; id: string };
  if (!user) {
    throw new AppError("Not authenticated", 401);
  }
  res.status(200).json(user);
});

// Get user by ID
export const getUserById = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await getUserFromCacheOrDb(req.params.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json(user);
  } catch (error) {
    throw new AppError("Error fetching user", 500);
  }
});

export const getUserFromCacheOrDb = async (userId: string) => {
  const cacheUser = await redisClient.get(userId);
  if (cacheUser) {
    return JSON.parse(cacheUser);
  }
  const user = await User.findById(userId);
  redisClient.set(userId, JSON.stringify(user), {
    EX: 3600,
    NX: true,
  });
  return user;
};

// Update user
export const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    for (const key in req.body) {
      if (key in user && typeof user[key as keyof IUser] !== "undefined") {
        (user as any)[key] = req.body[key];
      }
    }
    await user.save();
    await redisClient.del(user.id);
    res.status(200).json(user);
  } catch (error) {
    throw new AppError("Error updating user", 500);
  }
});

// Delete user
export const deleteUser = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    throw new AppError("Error deleting user", 500);
  }
});
