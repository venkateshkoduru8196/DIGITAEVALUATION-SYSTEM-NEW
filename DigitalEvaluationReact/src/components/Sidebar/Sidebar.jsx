import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleClick = (path) => {
    navigate(path);
    setIsOpen(false); // close sidebar after click (mobile)
  };

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <h2>My App</h2>

      <ul>
        <li onClick={() => handleClick("/dashboard")}>Dashboard</li>

        {role === "Admin" && (
          <>
            <li>Students</li>
            <li>Teachers</li>
            <li>Reports</li>
          </>
        )}

        {role === "Teacher" && (
          <>
            <li>Assigned Papers</li>
            <li>Evaluate</li>
          </>
        )}

        {role === "Student" && (
          <>
            <li>My Marks</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;