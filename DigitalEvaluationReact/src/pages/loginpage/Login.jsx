

 import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../api/axios";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Email Login
  const handleLogin = async () => {
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  // 🔹 Google Login
  const handleGoogleSuccess = async (credentialResponse) => {

    console.log("TOKEN:", credentialResponse.credential);
    try {
      const res = await API.post("/Auth/google-login", {
  token: credentialResponse.credential
});

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        <h2>Sign in</h2>
        <p className="login-subtitle">Continue to your account</p>

        {/* 🔥 GOOGLE LOGIN */}
        <div className="google-btn">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        <div className="divider">OR</div>

        {/* 🔹 EMAIL LOGIN */}
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />

        <button onClick={handleLogin}>Continue</button>

        <p className="login-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
  

  
    
    



