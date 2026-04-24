import {
  getExams,
  addExam,
  editExam,
  deleteExam
} from "../api/examApi";

export const fetchExams = async () => {
  const res = await getExams();
  return res.data;
};

export const createExam = async (data) => {
  const res = await addExam(data);
  return res.data;
};

export const updateExam = async (data) => {
  const res = await editExam(data);
  return res.data;
};

export const removeExam = async (id) => {
  const res = await deleteExam(id);
  return res.data;
};