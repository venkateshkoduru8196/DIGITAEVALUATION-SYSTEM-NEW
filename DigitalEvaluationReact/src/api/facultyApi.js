import API from "./axios";

// GET ALL
export const getFaculties = () => API.get("/Faculty");

// GET BY ID
export const getFacultyById = (id) =>
  API.get(`/Faculty/${id}`);

// CREATE
export const addFaculty = (data) =>
  API.post("/Faculty", data);

// UPDATE
export const editFaculty = (data) =>
  API.put("/Faculty", data);

// DELETE
export const deleteFaculty = (id) =>
  API.delete(`/Faculty/${id}`);