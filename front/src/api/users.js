import API from "./axios";

export const getUserProfile = async () => {
  const response = await API.get("/user/profile");
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await API.put("/user/profile", userData);
  return response.data;
};

export const getFreelancers = async (filters = {}) => {
  const response = await API.get("/user/freelancers", { params: filters });
  return response.data;
};

export const getFreelancerById = async (id) => {
  const response = await API.get(`/user/freelancers/${id}`);
  return response.data;
};

export const updatePortfolio = async (portfolioData) => {
  const response = await API.put("/user/portfolio", portfolioData);
  return response.data;
};
