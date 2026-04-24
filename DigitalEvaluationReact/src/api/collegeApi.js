import API from "./axios";

// GET
export const getColleges = () => API.get("/Colleges");

// CREATE
export const addCollege = (data) => API.post("/Colleges", data);

// UPDATE (IMPORTANT)
export const editCollege = (id, data) =>
  API.put(`/Colleges/${id}`, data);

// DELETE
export const deleteCollege = (id) =>
  API.delete(`/Colleges/${id}`);