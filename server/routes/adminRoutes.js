import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/adminController.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(isAdmin); // Protect all routes below

router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
