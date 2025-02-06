import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser, getActiveUser } from "./user.controller";

const router = Router();

// Get all users
router.get("/", getAllUsers);

//Get active user
router.get("/me", getActiveUser);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.patch("/:id", updateUser);

//Upload Proflie Picture

// Delete user
router.delete("/:id", deleteUser);

export default router;
