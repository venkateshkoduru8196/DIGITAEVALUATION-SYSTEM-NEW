import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchCourseSubjects,
  createCourseSubject,
  updateCourseSubject,
  removeCourseSubject
} from "../../services/courseSubjectService";

import { fetchCourses } from "../../services/courseService";
import { fetchBranches } from "../../services/branchService";
import { fetchSubjects } from "../../services/subjectService";

import "./CourseSubjects.css";

function CourseSubjects() {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [filter, setFilter] = useState("");

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [form, setForm] = useState({
    courseId: "",
    branchId: "",
    subjectId: "",
    semester: "",
    isElective: false
  });

  const [errors, setErrors] = useState({});

  // LOAD
  const loadAll = async () => {
    const [cs, c, b, s] = await Promise.all([
      fetchCourseSubjects(),
      fetchCourses(),
      fetchBranches(),
      fetchSubjects()
    ]);

    setData(cs || []);
    setCourses(c || []);
    setBranches(b || []);
    setSubjects(s || []);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // NAME MAPPING
  const getCourseName = id =>
    courses.find(c => Number(c.courseId) === Number(id))?.courseName || "-";

  const getBranchName = id =>
    branches.find(b => Number(b.branchId) === Number(id))?.branchName || "-";

  const getSubjectName = id =>
    subjects.find(s => Number(s.subjectId) === Number(id))?.subjectName || "-";

  // VALIDATION
  const validate = () => {
    let err = {};

    if (!form.courseId) err.courseId = "Course required";
    if (!form.branchId) err.branchId = "Branch required";
    if (!form.subjectId) err.subjectId = "Subject required";
    if (!form.semester) err.semester = "Semester required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ADD
  const handleAdd = async e => {
    e.preventDefault();
    if (!validate()) return;

    const toastId = toast.loading("Saving...");

    try {
      await createCourseSubject({
        ...form,
        courseId: Number(form.courseId),
        branchId: Number(form.branchId),
        subjectId: Number(form.subjectId),
        semester: Number(form.semester)
      });

      toast.success("Added ✅", { id: toastId });
      loadAll();

      setForm({
        courseId: "",
        branchId: "",
        subjectId: "",
        semester: "",
        isElective: false
      });

      setErrors({});
    } catch {
      toast.error("Failed ❌", { id: toastId });
    }
  };

  // DELETE
  const handleDelete = async id => {
    if (!window.confirm("Delete?")) return;

    const toastId = toast.loading("Deleting...");

    try {
      await removeCourseSubject(id);
      toast.success("Deleted 🗑️", { id: toastId });
      loadAll();
    } catch {
      toast.error("Failed ❌", { id: toastId });
    }
  };

  // EDIT
  const handleEdit = row => {
    setEditId(row.id);
    setEditForm({
      ...row,
      courseId: String(row.courseId),
      branchId: String(row.branchId),
      subjectId: String(row.subjectId)
    });
  };

  const handleEditChange = e => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating...");

    try {
      await updateCourseSubject({
        ...editForm,
        courseId: Number(editForm.courseId),
        branchId: Number(editForm.branchId),
        subjectId: Number(editForm.subjectId),
        semester: Number(editForm.semester)
      });

      toast.success("Updated ✅", { id: toastId });
      setEditId(null);
      loadAll();
    } catch {
      toast.error("Failed ❌", { id: toastId });
    }
  };

  // FILTER
  const filtered = data.filter(row => {
    const c = getCourseName(row.courseId).toLowerCase();
    const b = getBranchName(row.branchId).toLowerCase();
    const s = getSubjectName(row.subjectId).toLowerCase();

    return (
      c.includes(filter.toLowerCase()) ||
      b.includes(filter.toLowerCase()) ||
      s.includes(filter.toLowerCase())
    );
  });

  return (
    <div className="course-container">
      <h2>📘 Course Subject Mapping</h2>

      {/* FORM */}
      <form className="form-card-modern" onSubmit={handleAdd}>
        <h3>Add Mapping</h3>

        <div className="form-group">
          <label>Course</label>
          <select value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })}>
            <option value="">Select</option>
            {courses.map(c => (
              <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
            ))}
          </select>
          <span className="error">{errors.courseId}</span>
        </div>

        <div className="form-group">
          <label>Branch</label>
          <select value={form.branchId} onChange={e => setForm({ ...form, branchId: e.target.value })}>
            <option value="">Select</option>
            {branches.map(b => (
              <option key={b.branchId} value={b.branchId}>{b.branchName}</option>
            ))}
          </select>
          <span className="error">{errors.branchId}</span>
        </div>

        <div className="form-group">
          <label>Subject</label>
          <select value={form.subjectId} onChange={e => setForm({ ...form, subjectId: e.target.value })}>
            <option value="">Select</option>
            {subjects.map(s => (
              <option key={s.subjectId} value={s.subjectId}>{s.subjectName}</option>
            ))}
          </select>
          <span className="error">{errors.subjectId}</span>
        </div>

        <div className="form-group">
          <label>Semester</label>
          <input
            type="number"
            value={form.semester}
            onChange={e => setForm({ ...form, semester: e.target.value })}
          />
          <span className="error">{errors.semester}</span>
        </div>

        <div className="checkbox-modern">
          <input
            type="checkbox"
            checked={form.isElective}
            onChange={e => setForm({ ...form, isElective: e.target.checked })}
          />
          <span>Elective</span>
        </div>

        <button className="btn-modern">Add Mapping</button>
      </form>

      {/* FILTER */}
      <input
        className="filter"
        placeholder="Search..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Branch</th>
            <th>Subject</th>
            <th>Sem</th>
            <th>Elective</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(row => (
            <tr key={row.id}>
              {editId === row.id ? (
                <>
                  <td>
                    <select name="courseId" value={editForm.courseId} onChange={handleEditChange}>
                      {courses.map(c => (
                        <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select name="branchId" value={editForm.branchId} onChange={handleEditChange}>
                      {branches.map(b => (
                        <option key={b.branchId} value={b.branchId}>{b.branchName}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select name="subjectId" value={editForm.subjectId} onChange={handleEditChange}>
                      {subjects.map(s => (
                        <option key={s.subjectId} value={s.subjectId}>{s.subjectName}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input type="number" name="semester" value={editForm.semester} onChange={handleEditChange} />
                  </td>

                  <td>
                    <input type="checkbox" name="isElective" checked={editForm.isElective} onChange={handleEditChange} />
                  </td>

                  <td>
                    <button className="btn save" onClick={handleUpdate}>Save</button>
                    <button className="btn cancel" onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{getCourseName(row.courseId)}</td>
                  <td>{getBranchName(row.branchId)}</td>
                  <td>{getSubjectName(row.subjectId)}</td>
                  <td>{row.semester}</td>
                  <td>{row.isElective ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn edit" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="btn delete" onClick={() => handleDelete(row.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseSubjects;