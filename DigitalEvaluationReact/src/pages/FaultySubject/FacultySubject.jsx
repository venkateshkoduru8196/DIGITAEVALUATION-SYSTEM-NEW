import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchFacultySubjects,
  createFacultySubject,
  updateFacultySubject,
  removeFacultySubject
} from "../../services/facultySubjectService";

import { fetchFaculties } from "../../services/facultyService";
import { fetchSubjects } from "../../services/subjectService";

import "./FacultySubject.css";

function FacultySubjects() {
  const [data, setData] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [form, setForm] = useState({
    facultyId: "",
    subjectId: "",
    semester: "",
    academicYear: ""
  });

  // ✅ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // LOAD DATA
  const loadAll = async () => {
    const [fs, f, s] = await Promise.all([
      fetchFacultySubjects(),
      fetchFaculties(),
      fetchSubjects()
    ]);

    setData(fs || []);
    setFaculties(f || []);
    setSubjects(s || []);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ✅ FILTER (faculty + subject)
  const filteredData = data.filter((row) => {
    const val = search.toLowerCase();

    const faculty = faculties.find(
      (f) => f.facultyId === row.facultyId
    );

    const subject = subjects.find(
      (s) => s.subjectId === row.subjectId
    );

    return (
      faculty?.firstName?.toLowerCase().includes(val) ||
      faculty?.lastName?.toLowerCase().includes(val) ||
      subject?.subjectName?.toLowerCase().includes(val)
    );
  });

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);

  // ADD
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.facultyId || !form.subjectId) {
      toast.error("Select faculty & subject");
      return;
    }

    const t = toast.loading("Adding...");

    try {
      await createFacultySubject({
        facultyId: Number(form.facultyId),
        subjectId: Number(form.subjectId),
        semester: Number(form.semester),
        academicYear: form.academicYear
      });

      toast.success("Added ✅", { id: t });

      setForm({
        facultyId: "",
        subjectId: "",
        semester: "",
        academicYear: ""
      });

      loadAll();
    } catch (err) {
      toast.error(err || "Error ❌", { id: t });
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    const t = toast.loading("Deleting...");

    try {
      await removeFacultySubject(id);
      toast.success("Deleted 🗑️", { id: t });
      loadAll();
    } catch {
      toast.error("Error ❌", { id: t });
    }
  };

  // EDIT
  const handleEdit = (row) => {
    setEditId(row.id);
    setEditForm({ ...row });
  };

  const handleUpdate = async () => {
    const t = toast.loading("Updating...");

    try {
      await updateFacultySubject({
        ...editForm,
        facultyId: Number(editForm.facultyId),
        subjectId: Number(editForm.subjectId),
        semester: Number(editForm.semester)
      });

      toast.success("Updated ✅", { id: t });
      setEditId(null);
      loadAll();
    } catch (err) {
      toast.error(err || "Update failed ❌", { id: t });
    }
  };

  return (
    <div className="faculty-container">
      <h2 className="title">📘 Faculty Subject Mapping</h2>

      {/* FORM */}
      <form className="faculty-card" onSubmit={handleAdd}>
        <label>Faculty</label>
        <select
          value={form.facultyId}
          onChange={(e) =>
            setForm({ ...form, facultyId: e.target.value })
          }
        >
          <option value="">Select Faculty</option>
          {faculties.map((f) => (
            <option key={f.facultyId} value={f.facultyId}>
              {f.firstName} {f.lastName}
            </option>
          ))}
        </select>

        <label>Subject</label>
        <select
          value={form.subjectId}
          onChange={(e) =>
            setForm({ ...form, subjectId: e.target.value })
          }
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.subjectId} value={s.subjectId}>
              {s.subjectName}
            </option>
          ))}
        </select>

        <label>Semester</label>
        <input
          type="number"
          value={form.semester}
          onChange={(e) =>
            setForm({ ...form, semester: e.target.value })
          }
        />

        <label>Academic Year</label>
        <input
          value={form.academicYear}
          onChange={(e) =>
            setForm({ ...form, academicYear: e.target.value })
          }
        />

        <button className="btn add-btn">Add Mapping</button>
      </form>

      {/* TABLE */}
      <div className="table-container">
        <div className="table-header">
          <input
            className="search-box"
            placeholder="Search faculty / subject..."
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
              <th>Faculty</th>
              <th>Subject</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((row) => {
              const faculty = faculties.find(
                (f) => f.facultyId === row.facultyId
              );

              const subject = subjects.find(
                (s) => s.subjectId === row.subjectId
              );

              return (
                <tr key={row.id}>
                  <td>
                    {editId === row.id ? (
                      <select
                        value={editForm.facultyId}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            facultyId: e.target.value
                          })
                        }
                      >
                        {faculties.map((f) => (
                          <option key={f.facultyId} value={f.facultyId}>
                            {f.firstName} {f.lastName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      `${faculty?.firstName || ""} ${faculty?.lastName || ""}`
                    )}
                  </td>

                  <td>
                    {editId === row.id ? (
                      <select
                        value={editForm.subjectId}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            subjectId: e.target.value
                          })
                        }
                      >
                        {subjects.map((s) => (
                          <option key={s.subjectId} value={s.subjectId}>
                            {s.subjectName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      subject?.subjectName
                    )}
                  </td>

                  <td>{row.semester}</td>
                  <td>{row.academicYear}</td>

                  <td>
                    {editId === row.id ? (
                      <>
                        <button
                          type="button"
                          className="btn edit-btn"
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn cancel-btn"
                          onClick={() => setEditId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn edit-btn"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn delete-btn"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
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

export default FacultySubjects;