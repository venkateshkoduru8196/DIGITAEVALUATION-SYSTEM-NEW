import {
  getAnswerSheets,
  uploadAnswerSheet,
  updateStatus,
  deleteAnswerSheet
} from "../api/answerSheetApi";

export const fetchAnswerSheets = async () => {
  const res = await getAnswerSheets();
  return res.data;
};

export const createAnswerSheet = async (data) => {
  const res = await uploadAnswerSheet(data);
  return res.data;
};

export const updateAnswerStatus = async (data) => {
  const res = await updateStatus(data);
  return res.data;
};

export const removeAnswerSheet = async (id) => {
  const res = await deleteAnswerSheet(id);
  return res.data;
};