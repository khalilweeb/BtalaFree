import API from "./axios";

export const submitProposal = async (proposalData) => {
  const response = await API.post("/proposals", proposalData);
  return response.data;
};

export const getProposalsByJob = async (jobId) => {
  const response = await API.get(`/proposals/job/${jobId}`);
  return response.data;
};

export const getProposalsByFreelancer = async (freelancerId) => {
  const response = await API.get(`/proposals/freelancer/${freelancerId}`);
  return response.data;
};

export const getFreelancerProposals = async (freelancerId) => {
  const response = await API.get(`/proposals/freelancer/${freelancerId}`);
  return response.data;
};

export const acceptProposal = async (proposalId) => {
  const response = await API.put(`/proposals/${proposalId}/accept`);
  return response.data;
};

export const rejectProposal = async (proposalId) => {
  const response = await API.put(`/proposals/${proposalId}/reject`);
  return response.data;
};
