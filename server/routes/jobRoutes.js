import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getClientJobs,
} from "../controllers/jobController.js";

const router = express.Router();

router.route("/")
  .get(getJobs)
  .post(createJob);

router.route("/client/:clientId")
  .get(getClientJobs);

router.route("/:id")
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

export default router;
