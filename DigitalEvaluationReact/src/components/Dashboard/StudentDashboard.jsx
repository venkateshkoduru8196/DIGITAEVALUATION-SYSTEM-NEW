// // import "./StudentDashboard.css";
// // import { useEffect, useState } from "react";
// // import API from "../../api";
// // import LogoutButton from "../logout/logout";

// // function StudentDashboard() {
// //   const [papers, setPapers] = useState([]);

// //   useEffect(() => {
// //     API.get("/Paper/my-papers")
// //       .then(res => setPapers(res.data))
// //       .catch(() => console.log("Error"));
// //   }, []);

// //   const total = papers.length;
// //   const completed = papers.filter(p => p.status === "Completed").length;
// //   const pending = papers.filter(p => p.status === "Pending").length;

// //   return (
// //     <div className="student-container">

// //       <div className="student-header">
// //         <h2>Student Dashboard</h2>
// //         <LogoutButton />
// //       </div>

// //       {/* 🔥 CARDS (REAL DATA) */}
// //       <div className="student-grid">
// //         <div className="card">
// //           <h3>Total Papers</h3>
// //           <p>{total}</p>
// //         </div>

// //         <div className="card">
// //           <h3>Completed</h3>
// //           <p>{completed}</p>
// //         </div>

// //         <div className="card">
// //           <h3>Pending</h3>
// //           <p>{pending}</p>
// //         </div>
// //       </div>

// //       {/* 🔥 PAPER LIST */}
// //       <div className="student-box">
// //         <h3>My Papers</h3>

// //         {papers.length === 0 ? (
// //           <p>No papers found</p>
// //         ) : (
// //           papers.map(p => (
// //             <div key={p.paperId} className="paper-item">
// //               {p.subject} - {p.status} - {p.marks ?? "Not evaluated"}
// //             </div>
// //           ))
// //         )}
// //       </div>

// //     </div>
// //   );
// // }

// // export default StudentDashboard;



// import "./StudentDashboard.css";
// import { useEffect, useState } from "react";
// import API from "../../api";
// import LogoutButton from "../logout/logout";

// function StudentDashboard() {
//   const [papers, setPapers] = useState([]);

//   useEffect(() => {
//     API.get("/Paper/my-papers")
//       .then(res => setPapers(res.data))
//       .catch(() => console.log("Error"));
//   }, []);

//   const total = papers.length;
//   const completed = papers.filter(p => p.status === "Completed").length;
//   const pending = papers.filter(p => p.status === "Pending").length;

//   return (
//     <div className="student-container">

//       {/* Header */}
//       <div className="student-header">
//         <h2>Student Dashboard</h2>
//         <LogoutButton />
//       </div>

//       {/* Stat Cards */}
//       <div className="student-grid">
//         <div className="card">
//           <h3>Total Papers</h3>
//           <p>{total}</p>
//         </div>

//         <div className="card">
//           <h3>Completed</h3>
//           <p>{completed}</p>
//         </div>

//         <div className="card">
//           <h3>Pending</h3>
//           <p>{pending}</p>
//         </div>
//       </div>

//       {/* Paper List */}
//       <div className="student-box">
//         <h3>My Papers</h3>

//         {papers.length === 0 ? (
//           <p>No papers found</p>
//         ) : (
//           papers.map(p => (
//             <div key={p.paperId} className="paper-item">
//               <span className="paper-subject">{p.subject}</span>
//               <span className={`paper-status ${p.status === "Completed" ? "status-completed" : "status-pending"}`}>
//                 {p.status}
//               </span>
//               <span className="paper-marks">
//                 {p.marks ?? "Not evaluated"}
//               </span>
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   );
// }

// export default StudentDashboard;