import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchExams,
  createExam,
  updateExam,
  removeExam
} from "../../services/examService";

import { fetchCourses } from "../../services/courseService";
import { fetchBranches } from "../../services/branchService";

import "./Exams.css";

function Exams() {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [form, setForm] = useState({
    examName: "",
    examType: "",
    semester: "",
    academicYear: "",
    startDate: "",
    endDate: "",
    courseId: "",
    branchId: ""
  });

  const [errors, setErrors] = useState({});

  // LOAD DATA
  const loadAll = async () => {
    const [e, c, b] = await Promise.all([
      fetchExams(),
      fetchCourses(),
      fetchBranches()
    ]);

    setData(e || []);
    setCourses(c || []);
    setBranches(b || []);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ================= VALIDATION =================
  const validate = (obj) => {
    let err = {};

    if (!obj.examName?.trim())
      err.examName = "Exam Name is required";

    if (!obj.examType)
      err.examType = "Select Exam Type";

    if (!obj.semester)
      err.semester = "Semester is required";
    else if (obj.semester < 1 || obj.semester > 12)
      err.semester = "Semester must be between 1-12";

    if (!obj.academicYear)
      err.academicYear = "Academic Year is required";

    if (!obj.startDate)
      err.startDate = "Start Date is required";

    if (!obj.endDate)
      err.endDate = "End Date is required";

    if (obj.startDate && obj.endDate && obj.startDate > obj.endDate)
      err.endDate = "End Date must be after Start Date";

    if (!obj.courseId)
      err.courseId = "Select Course";

    if (!obj.branchId)
      err.branchId = "Select Branch";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    setErrors(prev => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // ================= ADD =================
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!validate(form)) return;

    const toastId = toast.loading("Saving...");

    try {
      await createExam({
        ...form,
        semester: Number(form.semester),
        courseId: Number(form.courseId),
        branchId: Number(form.branchId)
      });

      toast.success("Exam added ✅", { id: toastId });

      loadAll();

      setForm({
        examName: "",
        examType: "",
        semester: "",
        academicYear: "",
        startDate: "",
        endDate: "",
        courseId: "",
        branchId: ""
      });

      setErrors({});
    } catch {
      toast.error("Error ❌", { id: toastId });
    }
  };

  // ================= EDIT =================
  const handleEdit = (row) => {
    setEditId(row.examId);
    setEditForm({ ...row });
  };

  const handleUpdate = async () => {
    if (!validate(editForm)) return;

    const toastId = toast.loading("Updating...");

    try {
      await updateExam({
        ...editForm,
        semester: Number(editForm.semester),
        courseId: Number(editForm.courseId),
        branchId: Number(editForm.branchId)
      });

      toast.success("Updated ✏️", { id: toastId });

      setEditId(null);
      loadAll();
    } catch {
      toast.error("Update failed ❌", { id: toastId });
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete exam?")) return;

    const toastId = toast.loading("Deleting...");

    try {
      await removeExam(id);
      toast.success("Deleted 🗑️", { id: toastId });
      loadAll();
    } catch {
      toast.error("Delete failed ❌", { id: toastId });
    }
  };

  return (
    <div className="exam-page">
      <h2 className="title">Exam Management</h2>

      {/* FORM */}
      <form className="exam-card" onSubmit={handleAdd}>
        <h3>Add Exam</h3>

        <label>Exam Name</label>
        <input name="examName" value={form.examName} onChange={handleChange} className={errors.examName ? "input-error" : ""} />
        {errors.examName && <span className="error">{errors.examName}</span>}

        <label>Exam Type</label>
        <select name="examType" value={form.examType} onChange={handleChange} className={errors.examType ? "input-error" : ""}>
          <option value="">Select</option>
          <option value="Internal">Internal</option>
          <option value="External">External</option>
        </select>
        {errors.examType && <span className="error">{errors.examType}</span>}

        <label>Semester</label>
        <input type="number" name="semester" value={form.semester} onChange={handleChange} className={errors.semester ? "input-error" : ""} />
        {errors.semester && <span className="error">{errors.semester}</span>}

        <label>Academic Year</label>
        <input name="academicYear" value={form.academicYear} onChange={handleChange} className={errors.academicYear ? "input-error" : ""} />
        {errors.academicYear && <span className="error">{errors.academicYear}</span>}

        <label>Start Date</label>
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={errors.startDate ? "input-error" : ""} />
        {errors.startDate && <span className="error">{errors.startDate}</span>}

        <label>End Date</label>
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={errors.endDate ? "input-error" : ""} />
        {errors.endDate && <span className="error">{errors.endDate}</span>}

        <label>Course</label>
        <select name="courseId" value={form.courseId} onChange={handleChange} className={errors.courseId ? "input-error" : ""}>
          <option value="">Select</option>
          {courses.map(c => (
            <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
          ))}
        </select>
        {errors.courseId && <span className="error">{errors.courseId}</span>}

        <label>Branch</label>
        <select name="branchId" value={form.branchId} onChange={handleChange} className={errors.branchId ? "input-error" : ""}>
          <option value="">Select</option>
          {branches.map(b => (
            <option key={b.branchId} value={b.branchId}>{b.branchName}</option>
          ))}
        </select>
        {errors.branchId && <span className="error">{errors.branchId}</span>}

        <button className="btn add-btn">Add Exam</button>
      </form>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="course-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Sem</th>
              <th>Year</th>
              <th>Dates</th>
              <th>Course</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map(row =>
              editId === row.examId ? (
                <tr key={row.examId}>
                  <td><input name="examName" value={editForm.examName} onChange={handleEditChange} /></td>
                  <td>
                    <select name="examType" value={editForm.examType} onChange={handleEditChange}>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </select>
                  </td>
                  <td><input name="semester" value={editForm.semester} onChange={handleEditChange} /></td>
                  <td><input name="academicYear" value={editForm.academicYear} onChange={handleEditChange} /></td>
                  <td>
                    <input type="date" name="startDate" value={editForm.startDate?.split("T")[0]} onChange={handleEditChange} />
                    <input type="date" name="endDate" value={editForm.endDate?.split("T")[0]} onChange={handleEditChange} />
                  </td>
                  <td>
                    <select name="courseId" value={editForm.courseId} onChange={handleEditChange}>
                      {courses.map(c => <option key={c.courseId} value={c.courseId}>{c.courseName}</option>)}
                    </select>
                  </td>
                  <td>
                    <select name="branchId" value={editForm.branchId} onChange={handleEditChange}>
                      {branches.map(b => <option key={b.branchId} value={b.branchId}>{b.branchName}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="btn add-btn" onClick={handleUpdate}>Save</button>
                    <button className="btn cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={row.examId}>
                  <td>{row.examName}</td>
                  <td>{row.examType}</td>
                  <td>{row.semester}</td>
                  <td>{row.academicYear}</td>
                  <td>{row.startDate?.split("T")[0]} - {row.endDate?.split("T")[0]}</td>
                  <td>{row.courseId}</td>
                  <td>{row.branchId}</td>
                  <td>
                    <button className="btn edit-btn" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="btn delete-btn" onClick={() => handleDelete(row.examId)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exams;