import API from "./axios";

// GET ALL
export const getCourses = () => API.get("/Courses");

// GET BY ID
export const getCourseById = (id) => API.get(`/Courses/${id}`);

// CREATE
export const addCourse = (data) => API.post("/Courses", data);

// UPDATE (no id in URL → matches your controller)
export const editCourse = (data) => API.put("/Courses", data);

// DELETE
export const deleteCourse = (id) => API.delete(`/Courses/${id}`);