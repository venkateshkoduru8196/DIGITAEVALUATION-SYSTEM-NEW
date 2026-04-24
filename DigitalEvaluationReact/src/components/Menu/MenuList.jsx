import React, { useEffect, useState } from "react";
import { fetchMenus } from "../../services/menuService";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

const MenuList = ({ sidebarOpen }) => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await fetchMenus();
        setMenus(data);
      } catch (err) {
        console.error("Error loading menus:", err);
      }
    };

    loadMenus();
  }, []);

  return (
    <nav>
      <ul>
        {menus.map((menu) => (
          <MenuItem
            key={menu.menuId}
            menu={menu}
            sidebarOpen={sidebarOpen}
            navigate={navigate}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;