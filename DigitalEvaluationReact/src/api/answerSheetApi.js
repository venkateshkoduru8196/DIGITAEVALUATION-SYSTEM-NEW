import API from "./axios";

export const getAnswerSheets = () => API.get("/AnswerSheets");

export const uploadAnswerSheet = (data) =>
  API.post("/AnswerSheets/upload", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const updateStatus = (data) =>
  API.put("/AnswerSheets/status", data);

export const deleteAnswerSheet = (id) =>
  API.delete(`/AnswerSheets/${id}`);