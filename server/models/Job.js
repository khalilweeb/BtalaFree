import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  budget: {
    type: Number,
    required: [true, "Budget is required"],
  },

  status: {
    type: String,
    enum: ["pending", "selected", "done"],
    default: "pending",
  },

  // Posted by (client)
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Assigned freelancer (optional)
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  // Deadline or date posted
  deadline: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const Job = mongoose.model("Job", jobSchema);
export default Job;
