// import { useEffect, useState } from "react";
// import API from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import MenuList from "../../components/Menu/MenuList";
// import "./Dashboard.css";

// function Dashboard() {
//   const [message, setMessage] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [stats, setStats] = useState({ colleges: 0, uploads: 0 });

//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("/Secured")
//       .then(res => setMessage(res.data))
//       .catch(() => setMessage("Unauthorized"));

//     API.get("/College/count")
//       .then(res => setStats(prev => ({ ...prev, colleges: res.data })));

//     API.get("/Upload/count")
//       .then(res => setStats(prev => ({ ...prev, uploads: res.data })));
//   }, []);

//   return (
//     <div className="dashboard-layout">

//       {/* ✅ GLOBAL HAMBURGER (VISIBLE ALWAYS) */}
//       <button
//         className="global-hamburger"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         ☰
//       </button>

//       {/* SIDEBAR */}
//       <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-header">
//           <h2 className="sidebar-title">
//             {sidebarOpen ? "Digital Evaluation" : "DE"}
//           </h2>
//         </div>

//         <MenuList sidebarOpen={sidebarOpen} />
//       </aside>

//       {/* MAIN */}
//       <main className="main-content">
//         <h1>Dashboard Overview</h1>

//         <div className="stats-grid">
//           <div className="stat-card blue">
//             <h3>Total Colleges</h3>
//             <p>{stats.colleges}</p>
//             <span onClick={() => navigate("/colleges")}>
//               View Details →
//             </span>
//           </div>

//           <div className="stat-card yellow">
//             <h3>Excel Uploads</h3>
//             <p>{stats.uploads}</p>
//             <span onClick={() => navigate("/dashboard")}>
//               Upload Now →
//             </span>
//           </div>

//           <div className="stat-card green">
//             <h3>Authorized</h3>
//             <p>{message}</p>
//             <span>System Status</span>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;





import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/Menu/MenuList";
import "./Dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ colleges: 0, uploads: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/Secured")
      .then(res => setMessage(res.data))
      .catch(() => setMessage("Unauthorized"));

    API.get("/College/count")
      .then(res => setStats(prev => ({ ...prev, colleges: res.data })))
      .catch(() => {});

    API.get("/Upload/count")
      .then(res => setStats(prev => ({ ...prev, uploads: res.data })))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            {sidebarOpen ? "Digital Evaluation" : "DE"}
          </h2>

          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        <MenuList sidebarOpen={sidebarOpen} />
      </aside>

      {/* Main Content */}
      <main className="main-content">

           <button
    className="mobile-hamburger"
    onClick={() => setSidebarOpen(!sidebarOpen)}
      >
    ☰
          </button>



        <h1>Dashboard Overview</h1>

        <div className="stats-grid">
          <div className="stat-card blue">
            <h3>Total Colleges</h3>
            <p>{stats.colleges}</p>
            <span onClick={() => navigate("/colleges")}>
              View Details →
            </span>
          </div>

          <div className="stat-card yellow">
            <h3>Excel Uploads</h3>
            <p>{stats.uploads}</p>
            <span onClick={() => navigate("/dashboard")}>
              Upload Now →
            </span>
          </div>

          <div className="stat-card green">
            <h3>Authorized</h3>
            <p>{message}</p>
            <span>System Status</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

