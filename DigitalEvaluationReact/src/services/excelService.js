// services/excelService.js
import API from "../api/axios";

export const uploadExcel = async (file) => {
  const formData = new FormData();
  formData.append("File", file);

  const res = await API.post("/Auth/upload-excel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
