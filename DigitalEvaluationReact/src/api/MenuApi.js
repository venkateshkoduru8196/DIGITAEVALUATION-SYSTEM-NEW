

import API from "./axios";

// API call only
export const getMenusApi = () => {
  return API.get("/Menu/Menues");
};