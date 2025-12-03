import express from "express";
import {
  submitProposal,
  getProposalsByJob,
  getProposalsByFreelancer,
  acceptProposal,
  rejectProposal,
} from "../controllers/proposalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Submit a proposal (freelancer)
router.post("/", submitProposal);

// Get proposals by job (client)
router.get("/job/:jobId", getProposalsByJob);

// Get proposals by freelancer
router.get("/freelancer/:freelancerId", getProposalsByFreelancer);

// Accept a proposal (client)
router.put("/:proposalId/accept", acceptProposal);

// Reject a proposal (client)
router.put("/:proposalId/reject", rejectProposal);

export default router;
