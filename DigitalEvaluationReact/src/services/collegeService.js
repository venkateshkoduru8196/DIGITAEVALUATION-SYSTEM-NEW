import {
  getColleges,
  addCollege,
  editCollege,
  deleteCollege
} from "../api/collegeApi";

export const fetchColleges = async () => {
  const res = await getColleges();
  return res.data;
};

export const createCollege = async (data) => {
  const res = await addCollege(data);
  return res.data;
};

export const updateCollege = async (id, data) => {
  const res = await editCollege(id, data);
  return res.data;
};

export const removeCollege = async (id) => {
  const res = await deleteCollege(id);
  return res.data;
};