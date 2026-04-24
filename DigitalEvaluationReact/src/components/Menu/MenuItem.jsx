import React, { useState } from "react";

const MenuItem = ({ menu, sidebarOpen, navigate }) => {
  const [open, setOpen] = useState(false);

  const children = menu.children || [];
  const hasChildren = children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else {
      navigate(menu.menuUrl || "/dashboard");
    }
  };

  return (
    <li>
      <button className="sidebar-link" onClick={handleClick}>
        <span className="menu-icon">{menu.icon || "📁"}</span>

        {sidebarOpen && (
          <span className="menu-text">{menu.menuName}</span>
        )}

        {hasChildren && sidebarOpen && (
          <span className="dropdown-arrow">
            {open ? "▲" : "▼"}
          </span>
        )}
      </button>

      {hasChildren && open && (
        <ul className="submenu">
          {children.map((child) => (
            <MenuItem
              key={child.menuId}
              menu={child}
              sidebarOpen={sidebarOpen}
              navigate={navigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;