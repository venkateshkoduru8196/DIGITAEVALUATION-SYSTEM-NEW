import API from "./axios";

// GET ALL
export const getSubjects = () => API.get("/Subjects");

// GET BY ID
export const getSubjectById = (id) => API.get(`/Subjects/${id}`);

// CREATE
export const addSubject = (data) => API.post("/Subjects", data);

// UPDATE
export const editSubject = (data) => API.put("/Subjects", data);

// DELETE
export const deleteSubject = (id) => API.delete(`/Subjects/${id}`);