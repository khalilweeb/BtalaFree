import Job from "../models/Job.js";






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