import { getMenusApi } from "../api/MenuApi";

// Service layer
export const fetchMenus = async () => {
  try {
    const response = await getMenusApi();
    return response.data;
  } catch (error) {
    console.error("Menu fetch error:", error);
    throw error;
  }
};