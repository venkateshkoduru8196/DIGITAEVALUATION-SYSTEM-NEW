import API from "./axios";

// GET ALL
export const getFacultySubjects = () =>
  API.get("/FacultySubjects");

// GET BY ID
export const getFacultySubjectById = (id) =>
  API.get(`/FacultySubjects/${id}`);

// CREATE
export const addFacultySubject = (data) =>
  API.post("/FacultySubjects", data);

// UPDATE
export const editFacultySubject = (data) =>
  API.put("/FacultySubjects", data);

// DELETE
export const deleteFacultySubject = (id) =>
  API.delete(`/FacultySubjects/${id}`);