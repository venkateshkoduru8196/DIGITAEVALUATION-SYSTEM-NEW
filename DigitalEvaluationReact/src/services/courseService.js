import {
  getCourses,
  addCourse,
  editCourse,
  deleteCourse
} from "../api/courseApi";

// GET ALL
export const fetchCourses = async () => {
  const res = await getCourses();
  return res.data;
};

// CREATE
export const createCourse = async (data) => {
  const res = await addCourse(data);
  return res.data;
};

// UPDATE
export const updateCourse = async (data) => {
  const res = await editCourse(data);
  return res.data;
};

// DELETE
export const removeCourse = async (id) => {
  const res = await deleteCourse(id);
  return res.data;
};