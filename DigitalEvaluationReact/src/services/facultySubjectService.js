import {
  getFacultySubjects,
  getFacultySubjectById,
  addFacultySubject,
  editFacultySubject,
  deleteFacultySubject
} from "../api/facultySubjectApi";

// GET ALL
export const fetchFacultySubjects = async () => {
  try {
    const res = await getFacultySubjects();
    return res.data;
  } catch (err) {
    console.error("Error fetching faculty-subjects", err);
    return [];
  }
};

// GET BY ID
export const fetchFacultySubjectById = async (id) => {
  try {
    const res = await getFacultySubjectById(id);
    return res.data;
  } catch (err) {
    console.error("Error fetching single record", err);
    return null;
  }
};

// CREATE
export const createFacultySubject = async (data) => {
  try {
    const res = await addFacultySubject(data);
    return res.data;
  } catch (err) {
    throw err.response?.data || "Create failed";
  }
};

// UPDATE
export const updateFacultySubject = async (data) => {
  try {
    const res = await editFacultySubject(data);
    return res.data;
  } catch (err) {
    throw err.response?.data || "Update failed";
  }
};

// DELETE
export const removeFacultySubject = async (id) => {
  try {
    const res = await deleteFacultySubject(id);
    return res.data;
  } catch (err) {
    throw err.response?.data || "Delete failed";
  }
};