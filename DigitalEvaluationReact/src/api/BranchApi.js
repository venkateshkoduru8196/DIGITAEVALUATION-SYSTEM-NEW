import API from "./axios";

// GET ALL
export const getBranches = () => API.get("/Branches");

// CREATE
export const addBranch = (data) => API.post("/Branches", data);

// UPDATE
export const editBranch = (data) => API.put("/Branches", data);

// DELETE
export const deleteBranch = (id) => API.delete(`/Branches/${id}`);