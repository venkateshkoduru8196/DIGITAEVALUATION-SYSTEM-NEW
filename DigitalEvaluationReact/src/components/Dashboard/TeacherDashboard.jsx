import "./TeacherDashboard.css";
import { useEffect, useState } from "react";
import API from "../../api";
import LogoutButton from "../logout/logout";

function TeacherDashboard() {
  const [papers, setPapers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0
  });

  // 🔥 LOAD DATA
  const loadData = () => {
    API.get("/Paper/assigned")
      .then(res => setPapers(res.data));

    API.get("/Paper/dashboard")
      .then(res => setStats(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔥 EVALUATE
  const evaluate = async (paperId) => {
    const marks = prompt("Enter marks");

    if (!marks) return;

    await API.put(`/Paper/evaluate?paperId=${paperId}&marks=${marks}`);
    alert("Evaluated");

    loadData(); // refresh
  };

  return (
    <div className="teacher-container">

      <div className="teacher-header">
        <h2>Teacher Dashboard</h2>
        <LogoutButton />
      </div>

      {/* 🔥 REAL CARDS */}
      <div className="teacher-grid">
        <div className="card">
          <h3>Total Papers</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      {/* 🔥 PAPER LIST */}
      <div className="teacher-box">
        <h3>Assigned Papers</h3>

        {papers.length === 0 ? (
          <p>No papers assigned</p>
        ) : (
          papers.map(p => (
            <div key={p.paperId} className="paper-item">
              {p.subject} - {p.student} - {p.status}

              {p.status === "Pending" && (
                <button onClick={() => evaluate(p.paperId)}>
                  Evaluate
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default TeacherDashboard;