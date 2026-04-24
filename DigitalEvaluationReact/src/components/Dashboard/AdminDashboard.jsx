import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import API from "../../api";
import LogoutButton from "../logout/logout";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [message, setMessage] = useState("");

  const [stats] = useState({
    students: 120,
    teachers: 15,
    evaluations: 45
  });

  const navigate = useNavigate();

  // 🔥 NEW STATE (SUBJECT)
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);

  // 🔥 LOAD SUBJECTS
  const loadSubjects = () => {
    API.get("/Subject")
      .then(res => setSubjects(res.data))
      .catch(() => console.log("Error loading subjects"));
  };

  useEffect(() => {
    API.get("/UserMaster/admin-data")
      .then(res => setMessage(res.data))
      .catch(() => setMessage("Access error"));

    loadSubjects(); // 🔥 load subjects also
  }, []);

  // 🔥 ADD SUBJECT
  const handleAddSubject = async () => {
    if (!subjectName) {
      alert("Enter subject name");
      return;
    }

    try {
      await API.post("/Subject", {
        subjectName: subjectName
      });

      alert("Subject added");

      setSubjectName("");
      loadSubjects(); // refresh list
    } catch {
      alert("Error adding subject");
    }
  };

  return (
    <div className="admin-container">
      
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <LogoutButton />
      </div>

      {/* EXISTING CARDS */}
      <div className="admin-grid">
        <div className="card">
          <h3>Total Students</h3>
          <p>{stats.students}</p>
        </div>

        <div className="card">
          <h3>Total Teachers</h3>
          <p>{stats.teachers}</p>
        </div>

        <div className="card">
          <h3>Evaluations Done</h3>
          <p>{stats.evaluations}</p>
        </div>
      </div>

      {/* EXISTING BUTTONS */}
      <div className="admin-actions">
        <button>Add Student</button>
        <button>Add Teacher</button>
        <button>View Reports</button>
      </div>

      {/* 🔥 NEW SUBJECT SECTION */}
          

          <div className="subject-section">
  <h3>Add Subject</h3>

  <div className="subject-input">
    <input
      value={subjectName}
      onChange={(e) => setSubjectName(e.target.value)}
      placeholder="Enter subject name"
    />

    <button onClick={handleAddSubject}>Add</button>
  </div>

  <h3>All Subjects</h3>

  <div className="subject-list">
    {subjects.length === 0 ? (
      <p>No subjects found</p>
    ) : (
      subjects.map(s => (
        <div key={s.subjectId} className="subject-card">
          {s.subjectName}
        </div>
      ))
    )}
  </div>
</div>


     

      <p className="admin-message">{message}</p>



      <button onClick={() => navigate("/admin/universities")}>
  Universities
</button>
    </div>
  );
}

export default AdminDashboard;