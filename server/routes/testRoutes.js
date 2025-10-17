import express from "express";
import User from "../models/Users.js";

const router = express.Router();

// Create a test user
router.post("/create-user", async (req, res) => {
  try {
    const newUser = new User({
      name: "Test User",
      email: "boooo@example.com",
      password: "123456",
      role: "freelancer"
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;