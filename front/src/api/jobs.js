import API from "./axios";

export const getAllJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};

export const getJobById = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await API.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await API.put(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`);
  return response.data;
};

export const getClientJobs = async (clientId) => {
  const response = await API.get(`/jobs/client/${clientId}`);
  return response.data;
};
