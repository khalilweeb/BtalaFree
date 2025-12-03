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

// Get all contracts for a user (client or freelancer)
export const getUserContracts = async (req, res) => {
  try {
    const userId = req.user._id;
    let query = {};

    if (req.user.role === "client") {
      query.client = userId;
    } else if (req.user.role === "freelancer") {
      query.freelancer = userId;
    }

    const contracts = await Contract.find(query)
      .populate("job", "jobTitle description budget")
      .populate("client", "firstName lastName email companyName")
      .populate("freelancer", "firstName lastName email skills")
      .sort({ createdAt: -1 });

    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get contract by ID
export const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate("job")
      .populate("client", "firstName lastName email companyName")
      .populate("freelancer", "firstName lastName email skills rating");

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Check authorization
    if (
      contract.client._id.toString() !== req.user._id.toString() &&
      contract.freelancer._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete a contract
export const completeContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Only client can complete the contract
    if (contract.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the client can complete the contract" });
    }

    contract.etat = "completed";
    contract.end_dt = new Date();
    await contract.save();

    // Update job status
    await Job.findByIdAndUpdate(contract.job, { status: "done" });

    // Increment freelancer's completed contracts
    await User.findByIdAndUpdate(contract.freelancer, {
      $inc: { completedContracts: 1 }
    });

    res.status(200).json({ message: "Contract completed successfully", contract });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a contract
export const cancelContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Both client and freelancer can cancel
    if (
      contract.client.toString() !== req.user._id.toString() &&
      contract.freelancer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    contract.etat = "cancelled";
    contract.end_dt = new Date();
    await contract.save();

    // Update job status back to pending
    await Job.findByIdAndUpdate(contract.job, { status: "pending", freelancer: null });

    res.status(200).json({ message: "Contract cancelled", contract });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
