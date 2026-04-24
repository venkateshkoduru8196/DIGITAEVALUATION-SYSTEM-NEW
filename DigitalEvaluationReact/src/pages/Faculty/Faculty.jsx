import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchFaculties,
  createFaculty,
  updateFaculty,
  removeFaculty
} from "../../services/facultyService";

import { fetchBranches } from "../../services/branchService";

import "./Faculty.css";

function Faculty() {
  const [data, setData] = useState([]);
  const [branches, setBranches] = useState([]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    branchId: "",
    salary: ""
  });

  const [errors, setErrors] = useState({});

  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({});

  // ================= LOAD =================
  const loadAll = async () => {
    const [f, b] = await Promise.all([
      fetchFaculties(),
      fetchBranches()
    ]);
    setData(f || []);
    setBranches(b || []);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ================= VALIDATION =================
  const validate = (obj) => {
    let err = {};

    if (!obj.employeeCode) err.employeeCode = "Required";
    if (!obj.firstName) err.firstName = "Required";
    if (!obj.lastName) err.lastName = "Required";

    if (!obj.email) err.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(obj.email)) err.email = "Invalid";

    if (!obj.designation) err.designation = "Required";
    if (!obj.branchId) err.branchId = "Select branch";
    if (!obj.salary || obj.salary <= 0) err.salary = "Invalid";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= ADD =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(form)) return;

    try {
      await createFaculty(form);
      toast.success("Added");

      setForm({
        employeeCode: "",
        firstName: "",
        lastName: "",
        email: "",
        designation: "",
        branchId: "",
        salary: ""
      });

      loadAll();
    } catch {
      toast.error("Error");
    }
  };

  // ================= EDIT =================
  const handleEdit = (row) => {
    setEditId(row.facultyId);
    setEditRow({ ...row });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow({ ...editRow, [name]: value });
  };

  const handleUpdate = async () => {
    if (!validate(editRow)) return;

    try {
      await updateFaculty(editRow);
      toast.success("Updated");
      setEditId(null);
      loadAll();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleCancel = () => {
    setEditId(null);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await removeFaculty(id);
      toast.success("Deleted");
      loadAll();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= SEARCH =================
  const filtered = data.filter((r) =>
    r.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    r.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.employeeCode?.toLowerCase().includes(search.toLowerCase())
  );

  const getBranchName = (id) =>
    branches.find((b) => b.branchId === id)?.branchName || id;

  return (
    <div className="exam-page">
      <h2 className="title">Faculty Management</h2>

      {/* FORM */}
      <form className="exam-card" onSubmit={handleSubmit}>
        <input
          placeholder="Employee Code"
          value={form.employeeCode}
          onChange={(e) => setForm({ ...form, employeeCode: e.target.value })}
        />
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />

        <select
          value={form.branchId}
          onChange={(e) => setForm({ ...form, branchId: e.target.value })}
        >
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b.branchId} value={b.branchId}>
              {b.branchName}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button className="btn add-btn">Add Faculty</button>
      </form>

      {/* 🔥 TABLE + FILTER */}
      <div className="table-container">

        {/* HEADER */}
        <div className="table-header">
          <input
            className="search-box"
            placeholder="Search faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span className="count">
            Total: {filtered.length}
          </span>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="course-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Branch</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7">No data</td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.facultyId}
                      className={editId === row.facultyId ? "editing-row" : ""}>

                    {editId === row.facultyId ? (
                      <>
                        <td>
                          <input name="employeeCode" value={editRow.employeeCode} onChange={handleEditChange}/>
                        </td>

                        <td>
                          <input name="firstName" value={editRow.firstName} onChange={handleEditChange}/>
                          <input name="lastName" value={editRow.lastName} onChange={handleEditChange}/>
                        </td>

                        <td>
                          <input name="email" value={editRow.email} onChange={handleEditChange}/>
                        </td>

                        <td>
                          <input name="designation" value={editRow.designation} onChange={handleEditChange}/>
                        </td>

                        <td>
                          <select name="branchId" value={editRow.branchId} onChange={handleEditChange}>
                            {branches.map(b => (
                              <option key={b.branchId} value={b.branchId}>
                                {b.branchName}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>
                          <input type="number" name="salary" value={editRow.salary} onChange={handleEditChange}/>
                        </td>

                        <td>
                          <button className="btn edit-btn" onClick={handleUpdate}>Save</button>
                          <button className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{row.employeeCode}</td>
                        <td>{row.firstName} {row.lastName}</td>
                        <td>{row.email}</td>
                        <td>{row.designation}</td>
                        <td>{getBranchName(row.branchId)}</td>
                        <td>{row.salary}</td>

                        <td>
                          <button className="btn edit-btn" onClick={() => handleEdit(row)}>Edit</button>
                          <button className="btn delete-btn" onClick={() => handleDelete(row.facultyId)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Faculty;