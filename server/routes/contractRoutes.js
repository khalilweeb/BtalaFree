import express from "express";
import { createContract } from "../controllers/contractController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// contract creé
router.post("/", authMiddleware, createContract);

export default router;
