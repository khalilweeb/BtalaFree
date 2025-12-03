import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },

    proposedAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    estimatedDuration: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    proposedRating: {
      type: Number,
      min: 0,
      max: 5,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);
export default Proposal;
