import Contract from "../models/Contract.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

export const createContract = async (req, res) => {
  try {
    const { jobId, freelancerId } = req.body;

    // job existe
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    //  le client est seulement capable de creer un contract
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can create a contract" });
    }
    //  freelancer se trouve
    const freelancer = await User.findById(freelancerId);
    if (!freelancer || freelancer.role !== "freelancer") {
      return res.status(400).json({ message: "Invalid freelancer" });
    }

    // le contract se creer 
    const contract = await Contract.create({
      job: jobId,
      freelancer: freelancerId,
      client: req.user._id,
      etat: "active",
    });

    res.status(201).json(contract);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
