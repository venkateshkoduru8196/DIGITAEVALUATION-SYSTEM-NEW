import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../api/StudentApi";

// GET ALL
export const fetchStudents = async () => {
  const res = await getStudents();
  return res.data;
};

// GET BY ID
export const fetchStudentById = async (id) => {
  const res = await getStudentById(id);
  return res.data;
};

// CREATE
export const addStudent = async (data) => {
  const res = await createStudent(data);
  return res.data;
};

// UPDATE
export const editStudent = async (data) => {
  const res = await updateStudent(data);
  return res.data;
};

// DELETE
export const removeStudent = async (id) => {
  const res = await deleteStudent(id);
  return res.data;
};