import { useEffect, useState, useCallback } from "react";
import {
  fetchColleges,
  createCollege,
  updateCollege,
  removeCollege
} from "../../services/collegeService";

import "./Colleges.css";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    collegeCode: "",
    collegeName: "",
    city: "",
    state: "",
    country: ""
  });

  const [editForm, setEditForm] = useState({});

  // ================= LOAD =================
  const loadColleges = useCallback(async () => {
    try {
      const data = await fetchColleges();
      setColleges(data || []);
    } catch (err) {
      console.error("Error loading colleges", err);
    }
  }, []);

  useEffect(() => {
    loadColleges();
  }, [loadColleges]);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD =================
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await createCollege(form);

      loadColleges();

      setForm({
        collegeCode: "",
        collegeName: "",
        city: "",
        state: "",
        country: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error adding");
    }
  };

  // ================= EDIT =================
  const handleEdit = (c) => {
    setEditId(c.collegeId);
    setEditForm({ ...c });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateCollege(editId, editForm);

      setEditId(null);
      loadColleges();
    } catch {
      alert("Update failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this college?")) return;

    try {
      await removeCollege(id);
      loadColleges();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="college-container">
      <h2>🏫 College Management</h2>

      {/* ADD FORM */}
      <form className="college-form" onSubmit={handleAdd}>
        <input
          name="collegeCode"
          value={form.collegeCode}
          onChange={handleChange}
          placeholder="College Code"
          required
        />

        <input
          name="collegeName"
          value={form.collegeName}
          onChange={handleChange}
          placeholder="College Name"
          required
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
        />

        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
        />

        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
        />

        <button type="submit">Add</button>
      </form>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {colleges.map((c) =>
            editId === c.collegeId ? (
              <tr key={c.collegeId}>
                <td>{c.collegeId}</td>

                <td>
                  <input
                    name="collegeCode"
                    value={editForm.collegeCode}
                    onChange={handleEditChange}
                  />
                </td>

                <td>
                  <input
                    name="collegeName"
                    value={editForm.collegeName}
                    onChange={handleEditChange}
                  />
                </td>

                <td>
                  <input
                    name="city"
                    value={editForm.city || ""}
                    onChange={handleEditChange}
                  />
                </td>

                <td>
                  <input
                    name="state"
                    value={editForm.state || ""}
                    onChange={handleEditChange}
                  />
                </td>

                <td>
                  <input
                    name="country"
                    value={editForm.country || ""}
                    onChange={handleEditChange}
                  />
                </td>

                <td>
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={c.collegeId}>
                <td>{c.collegeId}</td>
                <td>{c.collegeCode}</td>
                <td>{c.collegeName}</td>
                <td>{c.city || "-"}</td>
                <td>{c.state || "-"}</td>
                <td>{c.country || "-"}</td>

                <td>
                  <button onClick={() => handleEdit(c)}>Edit</button>
                  <button onClick={() => handleDelete(c.collegeId)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Colleges;