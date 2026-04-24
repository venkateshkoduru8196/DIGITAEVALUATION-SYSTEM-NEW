import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchAnswerSheets,
  createAnswerSheet,
  updateAnswerStatus,
  removeAnswerSheet
} from "../../services/answerSheetService";

import { fetchStudents } from "../../services/studentService";
import { fetchSubjects } from "../../services/subjectService";
import { fetchExams } from "../../services/examService";

import "./Answersheets.css";

function AnswerSheets() {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    subjectId: "",
    examId: "",
    file: null
  });

  const [errors, setErrors] = useState({});

  // LOAD DATA
  const loadAll = async () => {
    const [a, s, sub, e] = await Promise.all([
      fetchAnswerSheets(),
      fetchStudents(),
      fetchSubjects(),
      fetchExams()
    ]);

    setData(a || []);
    setStudents(s || []);
    setSubjects(sub || []);
    setExams(e || []);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ================= VALIDATION =================
  const validate = () => {
    let err = {};

    if (!form.studentId) err.studentId = "Select student";
    if (!form.subjectId) err.subjectId = "Select subject";
    if (!form.examId) err.examId = "Select exam";
    if (!form.file) err.file = "File required";

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

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
    console.log(e.target.files[0]);

    setErrors(prev => {
      const copy = { ...prev };
      delete copy.file;
      return copy;
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("studentId", form.studentId);
    formData.append("subjectId", form.subjectId);
    formData.append("examId", form.examId);
    formData.append("file", form.file);

    const toastId = toast.loading("Uploading...");

    try {
      await createAnswerSheet(formData);

      toast.success("Uploaded ✅", { id: toastId });

      loadAll();

      setForm({
        studentId: "",
        subjectId: "",
        examId: "",
        file: null
      });

    } catch (err) {
      toast.error(err?.response?.data || "Upload failed ❌", { id: toastId });
    }
  };

  // ================= STATUS =================
  const handleStatus = async (id, status) => {
    try {
      await updateAnswerStatus({
        answerSheetId: id,
        status
      });
      loadAll();
    } catch {
      toast.error("Status update failed ❌");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await removeAnswerSheet(id);
      loadAll();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="exam-page">
      <h2 className="title">Answer Sheets</h2>

      {/* FORM */}
      <form className="exam-card" onSubmit={handleSubmit}>
        <h3>Upload Answer Sheet</h3>

        {/* STUDENT */}
        <label>Student</label>
        <select name="studentId" value={form.studentId} onChange={handleChange}>
          <option value="">Select</option>
          {students?.map(s => (
            <option key={s.studentId} value={s.studentId}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>
        {errors.studentId && <span className="error">{errors.studentId}</span>}

        {/* SUBJECT */}
        <label>Subject</label>
        <select name="subjectId" value={form.subjectId} onChange={handleChange}>
          <option value="">Select</option>
          {subjects?.map(s => (
            <option key={s.subjectId} value={s.subjectId}>
              {s.subjectName}
            </option>
          ))}
        </select>
        {errors.subjectId && <span className="error">{errors.subjectId}</span>}

        {/* EXAM */}
        <label>Exam</label>
        <select name="examId" value={form.examId} onChange={handleChange}>
          <option value="">Select</option>
          {exams?.map(e => (
            <option key={e.examId} value={e.examId}>
              {e.examName}
            </option>
          ))}
        </select>
        {errors.examId && <span className="error">{errors.examId}</span>}

        {/* FILE */}
        <label>File</label>
        <input type="file" onChange={handleFileChange} />
        {errors.file && <span className="error">{errors.file}</span>}

        <button className="btn add-btn">Upload</button>
      </form>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="course-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Exam</th>
              <th>File</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6">No data found</td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.answerSheetId}>
                  <td>{row.studentId}</td>
                  <td>{row.subjectId}</td>
                  <td>{row.examId}</td>

                  <td>
                    {row.filePath ? (
                      <a href={row.filePath} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>

                  <td>{row.status}</td>

                  <td>
                    <button
                      className="btn edit-btn"
                      onClick={() =>
                        handleStatus(row.answerSheetId, "Evaluated")
                      }
                    >
                      Mark Evaluated
                    </button>

                    <button
                      className="btn delete-btn"
                      onClick={() =>
                        handleDelete(row.answerSheetId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnswerSheets;