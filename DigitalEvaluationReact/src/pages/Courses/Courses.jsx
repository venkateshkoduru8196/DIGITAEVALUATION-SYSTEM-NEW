// import { useEffect, useState } from "react";
// import {
//   fetchCourses,
//   createCourse,
//   updateCourse,
//   removeCourse
// } from "../../services/courseService";

// import "./Courses.css";

// function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [editForm, setEditForm] = useState({});

//   const [form, setForm] = useState({
//     courseName: "",
//     courseCode: "",
//     durationYears: "",
//     totalSemesters: ""
//   });

//   // ================= LOAD =================
//   const loadCourses = async () => {
//     try {
//       const data = await fetchCourses();
//       setCourses(data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   // ================= VALIDATION =================
//   const validate = () => {
//     let newErrors = {};

//     if (!form.courseName.trim())
//       newErrors.courseName = "Course Name is required";

//     if (!form.durationYears)
//       newErrors.durationYears = "Duration is required";

//     if (form.durationYears && form.durationYears <= 0)
//       newErrors.durationYears = "Must be greater than 0";

//     if (!form.totalSemesters)
//       newErrors.totalSemesters = "Semesters required";

//     if (
//       form.durationYears &&
//       form.totalSemesters &&
//       form.totalSemesters !== form.durationYears * 2
//     )
//       newErrors.totalSemesters = "Semesters must be Years × 2";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ================= INPUT =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "durationYears") {
//       setForm({
//         ...form,
//         durationYears: value,
//         totalSemesters: value ? value * 2 : ""
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }

//     setErrors((prev) => {
//       const copy = { ...prev };
//       delete copy[name];
//       return copy;
//     });
//   };

//   // ================= ADD =================
//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       await createCourse({
//         ...form,
//         durationYears: Number(form.durationYears),
//         totalSemesters: Number(form.totalSemesters)
//       });

//       loadCourses();
//       setErrors({});
//       resetForm();
//     } catch {
//       alert("Add failed");
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (c) => {
//     setEditId(c.courseId);
//     setEditForm({ ...c });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "durationYears") {
//       setEditForm({
//         ...editForm,
//         durationYears: value,
//         totalSemesters: value ? value * 2 : ""
//       });
//     } else {
//       setEditForm({ ...editForm, [name]: value });
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateCourse({
//         ...editForm,
//         durationYears: Number(editForm.durationYears),
//         totalSemesters: Number(editForm.totalSemesters)
//       });

//       setEditId(null);
//       loadCourses();
//     } catch {
//       alert("Update failed");
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this course?")) return;

//     try {
//       await removeCourse(id);
//       loadCourses();
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   // ================= RESET =================
//   const resetForm = () => {
//     setForm({
//       courseName: "",
//       courseCode: "",
//       durationYears: "",
//       totalSemesters: ""
//     });
//     setErrors({});
//     setEditId(null);
//   };

//   return (
//     <div className="course-container">
//       <h2 className="title">📚 Course Management</h2>

//       {/* FORM */}
//       <form className="course-form" onSubmit={handleAdd}>
//         <h3>Add Course</h3>

//         <label>Course Name</label>
//         <input
//           name="courseName"
//           value={form.courseName}
//           onChange={handleChange}
//           className={errors.courseName ? "input-error" : ""}
//         />
//         {errors.courseName && <p className="error">{errors.courseName}</p>}

//         <label>Course Code</label>
//         <input
//           name="courseCode"
//           value={form.courseCode}
//           onChange={handleChange}
//         />

//         <label>Duration (Years)</label>
//         <input
//           type="number"
//           name="durationYears"
//           value={form.durationYears}
//           onChange={handleChange}
//           className={errors.durationYears ? "input-error" : ""}
//         />
//         {errors.durationYears && (
//           <p className="error">{errors.durationYears}</p>
//         )}

//         <label>Total Semesters</label>
//         <input
//           type="number"
//           value={form.totalSemesters}
//           readOnly
//           className={errors.totalSemesters ? "input-error" : ""}
//         />
//         {errors.totalSemesters && (
//           <p className="error">{errors.totalSemesters}</p>
//         )}

//         <button type="submit" className="btn add-btn">
//           Add Course
//         </button>
//       </form>

//       {/* TABLE */}
//       <div className="table-wrapper">
//         <table className="course-table">
//           <thead>
//             <tr>
//               <th>Code</th>
//               <th>Name</th>
//               <th>Years</th>
//               <th>Semesters</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {courses.map((c) =>
//               editId === c.courseId ? (
//                 <tr key={c.courseId} className="edit-row">
//                   <td>
//                     <input
//                       name="courseCode"
//                       value={editForm.courseCode || ""}
//                       onChange={handleEditChange}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       name="courseName"
//                       value={editForm.courseName}
//                       onChange={handleEditChange}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       name="durationYears"
//                       value={editForm.durationYears}
//                       onChange={handleEditChange}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       value={editForm.totalSemesters}
//                       readOnly
//                     />
//                   </td>

//                   <td>
//                     <button className="btn add-btn" onClick={handleUpdate}>
//                       Save
//                     </button>
//                     <button
//                       className="btn cancel-btn"
//                       onClick={() => setEditId(null)}
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ) : (
//                 <tr key={c.courseId}>
//                   <td data-label="Code">{c.courseCode || "-"}</td>
//                   <td data-label="Name">{c.courseName}</td>
//                   <td data-label="Years">{c.durationYears}</td>
//                   <td data-label="Semesters">{c.totalSemesters}</td>

//                   <td data-label="Actions">
//                     <button
//                       className="btn edit-btn"
//                       onClick={() => handleEdit(c)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn delete-btn"
//                       onClick={() => handleDelete(c.courseId)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Courses;





import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchCourses,
  createCourse,
  updateCourse,
  removeCourse
} from "../../services/courseService";

import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [editForm, setEditForm] = useState({});

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    courseName: "",
    courseCode: "",
    durationYears: "",
    totalSemesters: ""
  });

  // ✅ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // LOAD
  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // ✅ FILTER
  const filteredData = courses.filter((c) => {
    const val = search.toLowerCase();
    return (
      c.courseName?.toLowerCase().includes(val) ||
      c.courseCode?.toLowerCase().includes(val)
    );
  });

  // ✅ PAGINATION
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);

  // VALIDATION (same)
  const validate = () => {
    let newErrors = {};

    if (!form.courseName.trim())
      newErrors.courseName = "Course Name is required";

    if (!form.durationYears)
      newErrors.durationYears = "Duration is required";

    if (form.durationYears && form.durationYears <= 0)
      newErrors.durationYears = "Must be greater than 0";

    if (!form.totalSemesters)
      newErrors.totalSemesters = "Semesters required";

    if (
      form.durationYears &&
      form.totalSemesters &&
      form.totalSemesters !== form.durationYears * 2
    )
      newErrors.totalSemesters = "Semesters must be Years × 2";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "durationYears") {
      setForm({
        ...form,
        durationYears: value,
        totalSemesters: value ? value * 2 : ""
      });
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  // ADD
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const t = toast.loading("Adding course...");

    try {
      await createCourse({
        ...form,
        durationYears: Number(form.durationYears),
        totalSemesters: Number(form.totalSemesters)
      });

      toast.success("Course Added ✅", { id: t });

      loadCourses();
      resetForm();
    } catch {
      toast.error("Add failed ❌", { id: t });
    }
  };

  // EDIT
  const handleEdit = (c) => {
    setEditId(c.courseId);
    setEditForm({ ...c });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "durationYears") {
      setEditForm({
        ...editForm,
        durationYears: value,
        totalSemesters: value ? value * 2 : ""
      });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const t = toast.loading("Updating...");

    try {
      await updateCourse({
        ...editForm,
        durationYears: Number(editForm.durationYears),
        totalSemesters: Number(editForm.totalSemesters)
      });

      toast.success("Updated ✅", { id: t });

      setEditId(null);
      loadCourses();
    } catch {
      toast.error("Update failed ❌", { id: t });
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    const t = toast.loading("Deleting...");

    try {
      await removeCourse(id);
      toast.success("Deleted 🗑️", { id: t });
      loadCourses();
    } catch {
      toast.error("Delete failed ❌", { id: t });
    }
  };

  // RESET
  const resetForm = () => {
    setForm({
      courseName: "",
      courseCode: "",
      durationYears: "",
      totalSemesters: ""
    });
    setErrors({});
  };

  return (
    <div className="faculty-container">
      <h2 className="title">📚 Course Management</h2>

      {/* FORM */}
      <form className="faculty-card" onSubmit={handleAdd}>
        <label>Course Name</label>
        <input
          name="courseName"
          value={form.courseName}
          onChange={handleChange}
          className={errors.courseName ? "input-error" : ""}
        />
        {errors.courseName && <p className="error">{errors.courseName}</p>}

        <label>Course Code</label>
        <input
          name="courseCode"
          value={form.courseCode}
          onChange={handleChange}
        />

        <label>Duration (Years)</label>
        <input
          type="number"
          name="durationYears"
          value={form.durationYears}
          onChange={handleChange}
          className={errors.durationYears ? "input-error" : ""}
        />
        {errors.durationYears && (
          <p className="error">{errors.durationYears}</p>
        )}

        <label>Total Semesters</label>
        <input
          type="number"
          value={form.totalSemesters}
          readOnly
          className={errors.totalSemesters ? "input-error" : ""}
        />
        {errors.totalSemesters && (
          <p className="error">{errors.totalSemesters}</p>
        )}

        <button className="btn add-btn">Add Course</button>
      </form>

      {/* TABLE */}
      <div className="table-container">
        <div className="table-header">
          <input
            className="search-box"
            placeholder="Search course name / code..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <table className="faculty-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Years</th>
              <th>Semesters</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((c) =>
              editId === c.courseId ? (
                <tr key={c.courseId}>
                  <td>
                    <input
                      name="courseCode"
                      value={editForm.courseCode || ""}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      name="courseName"
                      value={editForm.courseName}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      name="durationYears"
                      value={editForm.durationYears}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={editForm.totalSemesters}
                      readOnly
                    />
                  </td>

                  <td>
                    <button className="btn edit-btn" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="btn cancel-btn"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={c.courseId}>
                  <td>{c.courseCode || "-"}</td>
                  <td>{c.courseName}</td>
                  <td>{c.durationYears}</td>
                  <td>{c.totalSemesters}</td>

                  <td>
                    <button
                      className="btn edit-btn"
                      onClick={() => handleEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(c.courseId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>Page {currentPage}</span>

          <button
            className="btn"
            disabled={indexOfLast >= filteredData.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Courses;