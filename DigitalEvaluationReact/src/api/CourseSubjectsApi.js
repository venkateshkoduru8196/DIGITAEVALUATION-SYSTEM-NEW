import API from "./axios";

// GET ALL
export const getCourseSubjects = () => API.get("/CourseSubjects");

// GET BY ID
export const getCourseSubjectById = (id) =>
  API.get(`/CourseSubjects/${id}`);

// CREATE
export const addCourseSubject = (data) =>
  API.post("/CourseSubjects", data);

// UPDATE
export const editCourseSubject = (data) =>
  API.put("/CourseSubjects", data);

// DELETE
export const deleteCourseSubject = (id) =>
  API.delete(`/CourseSubjects/${id}`);