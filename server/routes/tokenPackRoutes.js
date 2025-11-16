import express from "express";
import { createPack, updatePack, deletePack, listPacks } from "../controllers/tokenPackController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", authMiddleware, createPack);
router.get("/", listPacks);
router.put("/:id", authMiddleware, updatePack);
router.delete("/:id", authMiddleware, deletePack);

export default router;
