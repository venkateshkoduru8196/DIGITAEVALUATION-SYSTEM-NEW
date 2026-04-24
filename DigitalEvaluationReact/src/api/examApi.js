import API from "./axios";

// GET ALL
export const getExams = () => API.get("/Exams");

// CREATE
export const addExam = (data) => API.post("/Exams", data);

// UPDATE
export const editExam = (data) => API.put("/Exams", data);

// DELETE
export const deleteExam = (id) => API.delete(`/Exams/${id}`);