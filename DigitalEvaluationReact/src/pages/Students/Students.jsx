import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  fetchStudents,
  addStudent,
  editStudent,
  removeStudent
} from "../../services/studentService";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const [form, setForm] = useState({
    rollNumber: "",
    registrationNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    courseId: "",
    branchId: "",
    currentSemester: "",
    status: "Active"
  });

  const loadStudents = useCallback(async () => {
    const data = await fetchStudents();
    setStudents(data || []);
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const filteredStudents = students
    .filter((s) => {
      const val = search.toLowerCase();
      return (
        s.email?.toLowerCase().includes(val) ||
        s.rollNumber?.toLowerCase().includes(val) ||
        s.registrationNumber?.toLowerCase().includes(val) ||
        s.firstName?.toLowerCase().includes(val)
      );
    })
    .slice(0, visibleCount);

  const handleAdd = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Adding...");

    try {
      await addStudent({
        ...form,
        courseId: Number(form.courseId),
        branchId: Number(form.branchId),
        currentSemester: Number(form.currentSemester)
      });

      toast.success("Student added ✅", { id: toastId });
      loadStudents();

      setForm({
        rollNumber: "",
        registrationNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        courseId: "",
        branchId: "",
        currentSemester: "",
        status: "Active"
      });
    } catch {
      toast.error("Add failed ❌", { id: toastId });
    }
  };

  const handleEdit = (row) => {
    setEditId(row.studentId);
    setEditForm({ ...row });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating...");

    try {
      await editStudent({
        ...editForm,
        courseId: Number(editForm.courseId),
        branchId: Number(editForm.branchId),
        currentSemester: Number(editForm.currentSemester)
      });

      toast.success("Updated ✏️", { id: toastId });
      setEditId(null);
      loadStudents();
    } catch {
      toast.error("Update failed ❌", { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;

    const toastId = toast.loading("Deleting...");

    try {
      await removeStudent(id);
      toast.success("Deleted 🗑️", { id: toastId });
      loadStudents();
    } catch {
      toast.error("Delete failed ❌", { id: toastId });
    }
  };

  return (
    <div className="students-container">
      <h2 className="title">🎓 Student Management</h2>

      {/* FORM */}
      <form className="student-card" onSubmit={handleAdd}>
       

        <label>Roll Number</label>
        <input value={form.rollNumber} onChange={(e)=>setForm({...form,rollNumber:e.target.value})} />

        <label>Registration Number</label>
        <input value={form.registrationNumber} onChange={(e)=>setForm({...form,registrationNumber:e.target.value})} />

        <label>First Name</label>
        <input value={form.firstName} onChange={(e)=>setForm({...form,firstName:e.target.value})} />

        <label>Last Name</label>
        <input value={form.lastName} onChange={(e)=>setForm({...form,lastName:e.target.value})} />

        <label>Email</label>
        <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />

        <label>Course ID</label>
        <input value={form.courseId} onChange={(e)=>setForm({...form,courseId:e.target.value})} />

        <label>Branch ID</label>
        <input value={form.branchId} onChange={(e)=>setForm({...form,branchId:e.target.value})} />

        <label>Semester</label>
        <input value={form.currentSemester} onChange={(e)=>setForm({...form,currentSemester:e.target.value})} />

        <button className="btn add-btn">Add Student</button>
      </form>

      {/* TABLE SECTION */}
      <div className="table-section">

        {/* SEARCH aligned with table */}
        <div className="table-top">
          <input
            className="search-box"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(5);
            }}
          />
        </div>

        {/* TABLE CENTER */}
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Roll</th>
                <th>Email</th>
                <th>Sem</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s) =>
                editId === s.studentId ? (
                  <tr key={s.studentId}>
                    <td>{s.studentId}</td>
                    <td><input name="firstName" value={editForm.firstName} onChange={handleEditChange} /></td>
                    <td><input name="rollNumber" value={editForm.rollNumber} onChange={handleEditChange} /></td>
                    <td><input name="email" value={editForm.email} onChange={handleEditChange} /></td>
                    <td><input name="currentSemester" value={editForm.currentSemester} onChange={handleEditChange} /></td>
                    <td>
                      <button className="btn edit-btn" onClick={handleUpdate}>Save</button>
                      <button className="btn cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={s.studentId}>
                    <td>{s.studentId}</td>
                    <td>{s.firstName}</td>
                    <td>{s.rollNumber}</td>
                    <td>{s.email}</td>
                    <td>{s.currentSemester}</td>
                    <td>
                      <button className="btn edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="btn delete-btn" onClick={() => handleDelete(s.studentId)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* LOAD MORE */}
        {visibleCount < students.length && (
          <button className="load-more" onClick={() => setVisibleCount(v => v + 5)}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Students;