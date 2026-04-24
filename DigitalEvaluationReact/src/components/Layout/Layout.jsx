import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout">

      {/* ☰ Button (only mobile) */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <div className="main">
        {children}
      </div>
    </div>
  );
}

export default Layout;