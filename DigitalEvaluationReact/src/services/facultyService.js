import {
  getFaculties,
  addFaculty,
  editFaculty,
  deleteFaculty
} from "../api/facultyApi";

export const fetchFaculties = async () => {
  const res = await getFaculties();
  return res.data;
};

export const createFaculty = async (data) => {
  const res = await addFaculty(data);
  return res.data;
};

export const updateFaculty = async (data) => {
  const res = await editFaculty(data);
  return res.data;
};

export const removeFaculty = async (id) => {
  const res = await deleteFaculty(id);
  return res.data;
};