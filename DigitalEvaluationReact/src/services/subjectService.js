import {
  getSubjects,
  addSubject,
  editSubject,
  deleteSubject
} from "../api/subjectApi";

// GET ALL
export const fetchSubjects = async () => {
  const res = await getSubjects();
  return res.data;
};

// CREATE
export const createSubject = async (data) => {
  const res = await addSubject(data);
  return res.data;
};

// UPDATE
export const updateSubject = async (data) => {
  const res = await editSubject(data);
  return res.data;
};

// DELETE
export const removeSubject = async (id) => {
  const res = await deleteSubject(id);
  return res.data;
};