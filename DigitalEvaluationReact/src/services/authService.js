import API from "../api/axios";

// Register new user
export const registerUser = async (data) => {
  const res = await API.post("/Auth/register", data);
  // Save JWT in localStorage (backend sets refreshToken in cookie)
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// Login existing user
export const loginUser = async (data) => {
  const res = await API.post("/Auth/login", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// Logout user (revoke refresh token + clear localStorage)
export const logoutUser = async () => {
  try {
    await API.post("/Auth/revokeToken"); // backend clears refreshToken cookie
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login page
  }
};

// Refresh JWT manually (optional, usually handled by Axios interceptor)
export const refreshToken = async () => {
  try {
    const res = await API.get("/Auth/refreshToken");
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    console.error("Refresh failed:", err);
    logoutUser();
  }
};




// import API from "../api/axios";

// export const login = async (credentials) => {
//   const res = await API.post("/Auth/login", credentials);
//   // Backend returns JWT in body, refreshToken in cookie
//   localStorage.setItem("token", res.data.token);
//   return res.data;
// };

// export const register = async (data) => {
//   const res = await API.post("/Auth/register", data);
//   localStorage.setItem("token", res.data.token);
//   return res.data;
// };
