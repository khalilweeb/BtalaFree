import express from 'express';
import {
  signupUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getFreelancerById,
  getFreelancers,
  updateFreelancerPortfolio,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Get all freelancers (public)
router.get('/freelancers', getFreelancers);

// Get freelancer by ID (public)
router.get('/freelancers/:id', getFreelancerById);

// Protected routes
router.use(authMiddleware);

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile
router.put('/profile', updateUserProfile);

// Update freelancer portfolio
router.put('/portfolio', updateFreelancerPortfolio);

export default router;