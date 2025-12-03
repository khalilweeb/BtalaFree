import express from "express";
import {
  createContract,
  getUserContracts,
  getContractById,
  completeContract,
  cancelContract,
} from "../controllers/contractController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create contract
router.post("/", createContract);

// Get user contracts
router.get("/", getUserContracts);

// Get contract by ID
router.get("/:id", getContractById);

// Complete contract
router.put("/:id/complete", completeContract);

// Cancel contract
router.put("/:id/cancel", cancelContract);

export default router;
