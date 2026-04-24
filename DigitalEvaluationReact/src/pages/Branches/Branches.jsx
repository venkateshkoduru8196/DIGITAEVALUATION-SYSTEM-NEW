import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchBranches,
  createBranch,
  updateBranch,
  removeBranch
} from "../../services/branchService";

import "./Branches.css";

function Branches() {
  const [branches, setBranches] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");

  const [form, setForm] = useState({
    collegeId: "",
    branchName: "",
    branchCode: "",
    hodFacultyId: ""
  });

  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadBranches();
  }, []);

  // ================= LOAD =================
  const loadBranches = async () => {
    const toastId = toast.loading("Loading branches...");

    try {
      const data = await fetchBranches();
      setBranches(data || []);
      toast.dismiss(toastId);
    } catch {
      toast.error("Failed to load ❌", { id: toastId });
    }
  };

  // ================= ADD =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Adding branch...");

    try {
      await createBranch({
        collegeId: Number(form.collegeId),
        branchName: form.branchName.trim(),
        branchCode: form.branchCode.trim(),
        hodFacultyId: form.hodFacultyId
          ? Number(form.hodFacultyId)
          : null
      });

      toast.success("Branch added successfully ✅", { id: toastId });

      loadBranches();

      setForm({
        collegeId: "",
        branchName: "",
        branchCode: "",
        hodFacultyId: ""
      });
    } catch (err) {
      toast.error(err.response?.data || "Add failed ❌", {
        id: toastId
      });
    }
  };

  // ================= EDIT =================
  const handleEdit = (b) => {
    setEditId(b.branchId);
    setEditForm({ ...b });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating...");

    try {
      await updateBranch({
        branchId: editForm.branchId,
        collegeId: Number(editForm.collegeId),
        branchName: editForm.branchName.trim(),
        branchCode: editForm.branchCode.trim(),
        hodFacultyId: editForm.hodFacultyId
          ? Number(editForm.hodFacultyId)
          : null
      });

      toast.success("Updated successfully ✏️", { id: toastId });

      setEditId(null);
      setEditForm({});
      loadBranches();
    } catch (err) {
      toast.error(err.response?.data || "Update failed ❌", {
        id: toastId
      });
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete branch?")) return;

    const toastId = toast.loading("Deleting...");

    try {
      await removeBranch(id);
      toast.success("Deleted successfully 🗑️", { id: toastId });
      loadBranches();
    } catch {
      toast.error("Delete failed ❌", { id: toastId });
    }
  };

  // ================= FILTER =================
  const filtered = branches.filter(
    (b) =>
      b.branchName.toLowerCase().includes(filter.toLowerCase()) ||
      String(b.collegeId).includes(filter)
  );

  return (
    <div className="branches-container">
      <h2>🏫 Branch Management</h2>

      {/* FORM */}
      <form className="branch-card" onSubmit={handleAdd}>
        <h3>Add Branch</h3>

        <div className="form-group">
          <label>College ID</label>
          <input
            type="number"
            name="collegeId"
            value={form.collegeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Branch Name</label>
          <input
            name="branchName"
            value={form.branchName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Branch Code</label>
          <input
            name="branchCode"
            value={form.branchCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>HOD Faculty ID</label>
          <input
            type="number"
            name="hodFacultyId"
            value={form.hodFacultyId}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-main">
          Add Branch
        </button>
      </form>

      {/* FILTER */}
      <input
        className="filter"
        placeholder="Search branch / college..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* TABLE */}
      <table className="branch-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>College</th>
            <th>Name</th>
            <th>Code</th>
            <th>HOD</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((b) =>
            editId === b.branchId ? (
              <tr key={b.branchId}>
                <td>{b.branchId}</td>
                <td>
                  <input
                    name="collegeId"
                    value={editForm.collegeId}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="branchName"
                    value={editForm.branchName}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="branchCode"
                    value={editForm.branchCode}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="hodFacultyId"
                    value={editForm.hodFacultyId || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button type="button" className="btn save" onClick={handleUpdate}>
                    Save
                  </button>
                  <button type="button" className="btn cancel" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={b.branchId}>
                <td>{b.branchId}</td>
                <td>{b.collegeId}</td>
                <td>{b.branchName}</td>
                <td>{b.branchCode}</td>
                <td>{b.hodFacultyId || "-"}</td>
                <td>
                  <button type="button" className="btn edit" onClick={() => handleEdit(b)}>
                    Edit
                  </button>
                  <button type="button" className="btn delete" onClick={() => handleDelete(b.branchId)}>
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

export default Branches;