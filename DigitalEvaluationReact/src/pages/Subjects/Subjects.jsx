// import { useEffect, useState } from "react";
// import {
//   fetchSubjects,
//   createSubject,
//   updateSubject,
//   removeSubject
// } from "../../services/subjectService";

// import "./Subjects.css";

// function Subjects() {
//   const [subjects, setSubjects] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [editForm, setEditForm] = useState({});

//   const [form, setForm] = useState({
//     subjectName: "",
//     subjectCode: "",
//     credits: "",
//     maxMarks: "",
//     passingMarks: ""
//   });

//   // ================= LOAD =================
//   const loadSubjects = async () => {
//     try {
//       const data = await fetchSubjects();
//       setSubjects(data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadSubjects();
//   }, []);

//   // ================= VALIDATION =================
//   const validate = () => {
//     let newErrors = {};

//     if (!form.subjectName.trim())
//       newErrors.subjectName = "Subject Name is required";

//     if (!form.credits)
//       newErrors.credits = "Credits required";

//     if (!form.maxMarks)
//       newErrors.maxMarks = "Max Marks required";

//     if (!form.passingMarks)
//       newErrors.passingMarks = "Passing Marks required";

//     // if (form.passingMarks > form.maxMarks)
//     //   newErrors.passingMarks = "Passing marks cannot exceed max marks";

//      if (Number(form.passingMarks) > Number(form.maxMarks))
//   newErrors.passingMarks = "Passing marks cannot exceed max marks";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ================= INPUT =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm({ ...form, [name]: value });

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
//       await createSubject({
//         ...form,
//         credits: Number(form.credits),
//         maxMarks: Number(form.maxMarks),
//         passingMarks: Number(form.passingMarks)
//       });

//       loadSubjects();
//       resetForm();
//     } catch {
//       alert("Add failed");
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (s) => {
//     setEditId(s.subjectId);
//     setEditForm({ ...s });
//   };

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     if (editForm.passingMarks > editForm.maxMarks) {
//       alert("Passing marks cannot exceed max marks");
//       return;
//     }

   

//     try {
//       await updateSubject({
//         ...editForm,
//         credits: Number(editForm.credits),
//         maxMarks: Number(editForm.maxMarks),
//         passingMarks: Number(editForm.passingMarks)
//       });

//       setEditId(null);
//       loadSubjects();
//     } catch {
//       alert("Update failed");
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this subject?")) return;

//     try {
//       await removeSubject(id);
//       loadSubjects();
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   // ================= RESET =================
//   const resetForm = () => {
//     setForm({
//       subjectName: "",
//       subjectCode: "",
//       credits: "",
//       maxMarks: "",
//       passingMarks: ""
//     });
//     setErrors({});
//   };

//   return (
//     <div className="subject-container">
//       <h2 className="title">📘 Subject Management</h2>

//       {/* FORM */}
//       <form className="subject-form" onSubmit={handleAdd}>
//         <h3>Add Subject</h3>

//         <label>Subject Name</label>
//         <input
//           name="subjectName"
//           value={form.subjectName}
//           onChange={handleChange}
//           className={errors.subjectName ? "input-error" : ""}
//         />
//         {errors.subjectName && <p className="error">{errors.subjectName}</p>}

//         <label>Subject Code</label>
//         <input
//           name="subjectCode"
//           value={form.subjectCode}
//           onChange={handleChange}
//         />

//         <label>Credits</label>
//         <input
//           type="number"
//           name="credits"
//           value={form.credits}
//           onChange={handleChange}
//           className={errors.credits ? "input-error" : ""}
//         />
//         {errors.credits && <p className="error">{errors.credits}</p>}

//         <label>Max Marks</label>
//         <input
//           type="number"
//           name="maxMarks"
//           value={form.maxMarks}
//           onChange={handleChange}
//           className={errors.maxMarks ? "input-error" : ""}
//         />
//         {errors.maxMarks && <p className="error">{errors.maxMarks}</p>}

//         <label>Passing Marks</label>
//         <input
//           type="number"
//           name="passingMarks"
//           value={form.passingMarks}
//           onChange={handleChange}
//           className={errors.passingMarks ? "input-error" : ""}
//         />
//         {errors.passingMarks && (
//           <p className="error">{errors.passingMarks}</p>
//         )}

//         <button type="submit" className="btn add-btn">
//           Add Subject
//         </button>
//       </form>

//       {/* TABLE */}
//       <div className="table-wrapper">
//         <table className="subject-table">
//           <thead>
//             <tr>
//               <th>Code</th>
//               <th>Name</th>
//               <th>Credits</th>
//               <th>Max</th>
//               <th>Pass</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {subjects.map((s) =>
//               editId === s.subjectId ? (
//                 <tr key={s.subjectId}>
//                   <td>
//                     <input
//                       name="subjectCode"
//                       value={editForm.subjectCode || ""}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       name="subjectName"
//                       value={editForm.subjectName}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       name="credits"
//                       value={editForm.credits}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       name="maxMarks"
//                       value={editForm.maxMarks}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       name="passingMarks"
//                       value={editForm.passingMarks}
//                       onChange={handleEditChange}
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
//                 <tr key={s.subjectId}>
//                   <td>{s.subjectCode}</td>
//                   <td>{s.subjectName}</td>
//                   <td>{s.credits}</td>
//                   <td>{s.maxMarks}</td>
//                   <td>{s.passingMarks}</td>
//                   <td>
//                     <button
//                       className="btn edit-btn"
//                       onClick={() => handleEdit(s)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn delete-btn"
//                       onClick={() => handleDelete(s.subjectId)}
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

// export default Subjects;






import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchSubjects,
  createSubject,
  updateSubject,
  removeSubject
} from "../../services/subjectService";

import "./Subjects.css";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [editForm, setEditForm] = useState({});

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    credits: "",
    maxMarks: "",
    passingMarks: ""
  });

  // ✅ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // ================= LOAD =================
  const loadSubjects = async () => {
    try {
      const data = await fetchSubjects();
      setSubjects(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // ================= FILTER =================
  const filteredData = subjects.filter((s) => {
    const val = search.toLowerCase();
    return (
      s.subjectName?.toLowerCase().includes(val) ||
      s.subjectCode?.toLowerCase().includes(val)
    );
  });

  // ================= PAGINATION =================
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!form.subjectName.trim())
      newErrors.subjectName = "Subject Name is required";

    if (!form.credits)
      newErrors.credits = "Credits required";

    if (!form.maxMarks)
      newErrors.maxMarks = "Max Marks required";

    if (!form.passingMarks)
      newErrors.passingMarks = "Passing Marks required";

    if (Number(form.passingMarks) > Number(form.maxMarks))
      newErrors.passingMarks = "Passing marks cannot exceed max marks";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  // ================= ADD =================
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const t = toast.loading("Adding subject...");

    try {
      await createSubject({
        ...form,
        credits: Number(form.credits),
        maxMarks: Number(form.maxMarks),
        passingMarks: Number(form.passingMarks)
      });

      toast.success("Subject Added ✅", { id: t });

      loadSubjects();
      resetForm();
    } catch {
      toast.error("Add failed ❌", { id: t });
    }
  };

  // ================= EDIT =================
  const handleEdit = (s) => {
    setEditId(s.subjectId);
    setEditForm({ ...s });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (editForm.passingMarks > editForm.maxMarks) {
      toast.error("Passing marks cannot exceed max marks");
      return;
    }

    const t = toast.loading("Updating...");

    try {
      await updateSubject({
        ...editForm,
        credits: Number(editForm.credits),
        maxMarks: Number(editForm.maxMarks),
        passingMarks: Number(editForm.passingMarks)
      });

      toast.success("Updated ✅", { id: t });

      setEditId(null);
      loadSubjects();
    } catch {
      toast.error("Update failed ❌", { id: t });
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    const t = toast.loading("Deleting...");

    try {
      await removeSubject(id);
      toast.success("Deleted 🗑️", { id: t });
      loadSubjects();
    } catch {
      toast.error("Delete failed ❌", { id: t });
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      subjectName: "",
      subjectCode: "",
      credits: "",
      maxMarks: "",
      passingMarks: ""
    });
    setErrors({});
  };

  return (
    <div className="faculty-container">
      <h2 className="title">📘 Subject Management</h2>

      {/* FORM */}
      <form className="faculty-card" onSubmit={handleAdd}>
        <label>Subject Name</label>
        <input
          name="subjectName"
          value={form.subjectName}
          onChange={handleChange}
          className={errors.subjectName ? "input-error" : ""}
        />
        {errors.subjectName && <p className="error">{errors.subjectName}</p>}

        <label>Subject Code</label>
        <input
          name="subjectCode"
          value={form.subjectCode}
          onChange={handleChange}
        />

        <label>Credits</label>
        <input
          type="number"
          name="credits"
          value={form.credits}
          onChange={handleChange}
          className={errors.credits ? "input-error" : ""}
        />
        {errors.credits && <p className="error">{errors.credits}</p>}

        <label>Max Marks</label>
        <input
          type="number"
          name="maxMarks"
          value={form.maxMarks}
          onChange={handleChange}
          className={errors.maxMarks ? "input-error" : ""}
        />
        {errors.maxMarks && <p className="error">{errors.maxMarks}</p>}

        <label>Passing Marks</label>
        <input
          type="number"
          name="passingMarks"
          value={form.passingMarks}
          onChange={handleChange}
          className={errors.passingMarks ? "input-error" : ""}
        />
        {errors.passingMarks && <p className="error">{errors.passingMarks}</p>}

        <button className="btn add-btn">Add Subject</button>
      </form>

      {/* TABLE */}
      <div className="table-container">
        <div className="table-header">
          <input
            className="search-box"
            placeholder="Search subject name / code..."
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
              <th>Credits</th>
              <th>Max</th>
              <th>Pass</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((s) =>
              editId === s.subjectId ? (
                <tr key={s.subjectId}>
                  <td>
                    <input
                      name="subjectCode"
                      value={editForm.subjectCode || ""}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="subjectName"
                      value={editForm.subjectName}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="credits"
                      value={editForm.credits}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="maxMarks"
                      value={editForm.maxMarks}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="passingMarks"
                      value={editForm.passingMarks}
                      onChange={handleEditChange}
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
                <tr key={s.subjectId}>
                  <td>{s.subjectCode}</td>
                  <td>{s.subjectName}</td>
                  <td>{s.credits}</td>
                  <td>{s.maxMarks}</td>
                  <td>{s.passingMarks}</td>
                  <td>
                    <button
                      className="btn edit-btn"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(s.subjectId)}
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

export default Subjects;

