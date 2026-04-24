import {
  getBranches,
  addBranch,
  editBranch,
  deleteBranch
} from "../api/BranchApi";

export const fetchBranches = async () => {
  const res = await getBranches();
  return res.data;
};

export const createBranch = async (data) => {
  const res = await addBranch(data);
  return res.data;
};

export const updateBranch = async (data) => {
  const res = await editBranch(data);
  return res.data;
};

export const removeBranch = async (id) => {
  const res = await deleteBranch(id);
  return res.data;
};