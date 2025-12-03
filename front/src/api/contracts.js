import API from "./axios";

export const getUserContracts = async () => {
  const response = await API.get("/contracts");
  return response.data;
};

export const getContractById = async (id) => {
  const response = await API.get(`/contracts/${id}`);
  return response.data;
};

export const completeContract = async (id) => {
  const response = await API.put(`/contracts/${id}/complete`);
  return response.data;
};

export const cancelContract = async (id) => {
  const response = await API.put(`/contracts/${id}/cancel`);
  return response.data;
};
