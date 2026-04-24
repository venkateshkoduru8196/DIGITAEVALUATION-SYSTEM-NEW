import {
  getCourseSubjects,
  addCourseSubject,
  editCourseSubject,
  deleteCourseSubject
} from "../api/CourseSubjectsApi";

// GET
export const fetchCourseSubjects = async () => {
  const res = await getCourseSubjects();
  return res.data;
};

// CREATE
export const createCourseSubject = async (data) => {
  const res = await addCourseSubject(data);
  return res.data;
};

// UPDATE
export const updateCourseSubject = async (data) => {
  const res = await editCourseSubject(data);
  return res.data;
};

// DELETE
export const removeCourseSubject = async (id) => {
  const res = await deleteCourseSubject(id);
  return res.data;
};