import Job from "../models/Job.js";
import Proposal from "../models/Proposel.js";






//creation
export const createJob = async (req, res) => {
    try {
      const { jobTitle, description, budget, client, deadline } = req.body;
  
      const newJob = await Job.create({
        jobTitle,
        description,
        budget,
        client,
        deadline,
      });
  
      res.status(201).json(newJob);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

//get all job
export const getJobs = async (req, res) => {
    try {
      const jobs = await Job.find().populate("client freelancer", "lastName email");
      
      // If user is authenticated and is a freelancer, check which jobs they've proposed to
      if (req.user && req.user.role === "freelancer") {
        const freelancerId = req.user._id;
        
        // Get all proposals by this freelancer
        const proposals = await Proposal.find({ freelancer: freelancerId }).select("job");
        const proposedJobIds = proposals.map(p => p.job.toString());
        
        // Add hasProposed flag to each job
        const jobsWithProposalStatus = jobs.map(job => {
          const jobObj = job.toObject();
          jobObj.hasProposed = proposedJobIds.includes(job._id.toString());
          return jobObj;
        });
        
        return res.status(200).json(jobsWithProposalStatus);
      }
      
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// job by id
  export const getJobById = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate("client freelancer", "name email");
      if (!job) return res.status(404).json({ message: "Job not found" });
      
      // If user is authenticated and is a freelancer, check if they've proposed
      if (req.user && req.user.role === "freelancer") {
        const existingProposal = await Proposal.findOne({ 
          job: req.params.id, 
          freelancer: req.user._id 
        });
        
        const jobObj = job.toObject();
        jobObj.hasProposed = !!existingProposal;
        jobObj.proposalStatus = existingProposal ? existingProposal.status : null;
        
        return res.status(200).json(jobObj);
      }
      
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //update 
  export const updateJob = async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedJob) return res.status(404).json({ message: "Job not found" });
      res.status(200).json(updatedJob);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  //delete
  export const deleteJob = async (req, res) => {
    try {
      const deletedJob = await Job.findByIdAndDelete(req.params.id);
      if (!deletedJob) return res.status(404).json({ message: "Job not found" });
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get jobs by client
  export const getClientJobs = async (req, res) => {
    try {
      const jobs = await Job.find({ client: req.params.clientId })
        .populate("client", "firstName lastName email companyName")
        .populate("freelancer", "firstName lastName email rating skills")
        .sort({ createdAt: -1 });
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };