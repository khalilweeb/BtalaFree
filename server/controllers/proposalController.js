import Proposal from "../models/Proposal.js";
import Contract from "../models/Contract.js";
import Job from "../models/Job.js";

// Freelancer submits a proposal
export const submitProposal = async (req, res) => {
  try {
    const { jobId, bid, coverLetter } = req.body;
    const freelancerId = req.user.id; 

    const proposal = new Proposal({ jobId, freelancerId, bid, coverLetter });
    await proposal.save();

    res.status(201).json({ message: "Proposal submitted", proposal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Client accepts a proposal
export const acceptProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;

    const proposal = await Proposal.findById(proposalId);
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });

    const job = await Job.findById(proposal.jobId);
    if (job.clientId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    // Accept this proposal
    proposal.status = "accepted";
    await proposal.save();

    // Reject other proposals for the same job
    await Proposal.updateMany(
      { jobId: job._id, _id: { $ne: proposal._id } },
      { $set: { status: "rejected" } }
    );

    // Create contract
    const contract = new Contract({
      jobId: job._id,
      freelancerId: proposal.freelancerId,
      clientId: req.user.id,
    });
    await contract.save();

    res.status(200).json({ message: "Proposal accepted and contract created", contract });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
