import Proposal from "../models/Proposel.js";
import Contract from "../models/Contract.js";
import Job from "../models/Job.js";

// Freelancer submits a proposal
export const submitProposal = async (req, res) => {
  try {
    const { job, coverLetter, proposedAmount } = req.body;
    const freelancerId = req.user._id;

    // Get job to find client
    const jobData = await Job.findById(job);
    if (!jobData) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if freelancer already submitted a proposal for this job
    const existingProposal = await Proposal.findOne({ job, freelancer: freelancerId });
    if (existingProposal) {
      return res.status(400).json({ message: "You already submitted a proposal for this job" });
    }

    const proposal = await Proposal.create({
      job,
      freelancer: freelancerId,
      client: jobData.client,
      coverLetter,
      proposedAmount,
      status: "pending"
    });

    res.status(201).json({ message: "Proposal submitted successfully", proposal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Client accepts a proposal
export const acceptProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;

    const proposal = await Proposal.findById(proposalId).populate("job");
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });

    const job = await Job.findById(proposal.job);
    if (job.client.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    // Accept this proposal
    proposal.status = "accepted";
    await proposal.save();

    // Reject other proposals for the same job
    await Proposal.updateMany(
      { job: job._id, _id: { $ne: proposal._id } },
      { $set: { status: "rejected" } }
    );

    // Update job status and assign freelancer
    job.status = "selected";
    job.freelancer = proposal.freelancer;
    await job.save();

    // Create contract
    const contract = await Contract.create({
      job: job._id,
      freelancer: proposal.freelancer,
      client: req.user._id,
      etat: "active"
    });

    res.status(200).json({ message: "Proposal accepted and contract created", contract });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get proposals for a specific job (for client)
export const getProposalsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Verify client owns this job
    if (job.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const proposals = await Proposal.find({ job: jobId })
      .populate("freelancer", "firstName lastName email skills experienceLevel rating")
      .sort({ createdAt: -1 });

    res.status(200).json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get proposals by freelancer
export const getProposalsByFreelancer = async (req, res) => {
  try {
    const { freelancerId } = req.params;

    // Verify user is the freelancer or admin
    if (req.user._id.toString() !== freelancerId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const proposals = await Proposal.find({ freelancer: freelancerId })
      .populate("job", "jobTitle description budget status")
      .populate("client", "firstName lastName email companyName")
      .sort({ createdAt: -1 });

    res.status(200).json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject a proposal
export const rejectProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;

    const proposal = await Proposal.findById(proposalId).populate("job");
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });

    const job = await Job.findById(proposal.job);
    if (job.client.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    proposal.status = "rejected";
    await proposal.save();

    res.status(200).json({ message: "Proposal rejected", proposal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
