import API from "./axios";

// STUDENTS API

export const getStudents = () => API.get("/Students");

export const getStudentById = (id) =>
  API.get(`/Students/${id}`);

export const createStudent = (data) =>
  API.post("/Students", data);

export const updateStudent = (data) =>
  API.put("/Students", data);

export const deleteStudent = (id) =>
  API.delete(`/Students/${id}`);