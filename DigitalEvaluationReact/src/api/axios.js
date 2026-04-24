// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://localhost:7273/api",
//   withCredentials: true
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;




import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true // ✅ allows refreshToken cookie to be sent
});

// Attach JWT from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired JWT → refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get("http://localhost:5000/api/Auth/refreshToken", {
          withCredentials: true
        });

        // Save new JWT in localStorage
        localStorage.setItem("token", res.data.token);

        // Retry original request with new JWT
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
