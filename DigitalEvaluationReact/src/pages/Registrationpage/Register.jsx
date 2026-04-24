// import { useState } from "react";
// import { registerUser } from "../../services/authService";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     full_name: "",
//     institution_id: 1,
//     user_type: "Student",
//     is_active: true,
//     created_at: new Date().toISOString()
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await registerUser(form);
//       alert("Registered successfully");
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data || "Error");
//     }
//   };

//   return (
   

//   <div>
//     <h2>Register</h2>

//     <input name="username" onChange={handleChange} placeholder="Username" />
//     <input name="email" onChange={handleChange} placeholder="Email" />
//     <input name="password" type="password" onChange={handleChange} />
//     <input name="firstName" onChange={handleChange} placeholder="First Name" />
//     <input name="lastName" onChange={handleChange} placeholder="Last Name" />

//     <button onClick={handleSubmit}>Register</button>

//     {/* 🔥 LOGIN LINK */}
//     <p style={{ marginTop: "10px" }}>
//       Already have an account?{" "}
//       <span
//         style={{ color: "blue", cursor: "pointer" }}
//         onClick={() => navigate("/login")}
//       >
//         Login
//       </span>
//     </p>
//   </div>
// );
  
// }

// export default Register;






import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    full_name: "",
    institution_id: 1,
    user_type: "Student",
    is_active: true,
    created_at: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Error");
    }
  };
return (
  <div className="simple-register-container">
    <div className="simple-register-box">

      <h2>Create Account</h2>
      <p className="subtitle">Join the platform today</p>

      <div className="row">
        <input
          name="firstName"
          placeholder="First name"
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last name"
          onChange={handleChange}
        />
      </div>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email address"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Create Account →
      </button>

      <p className="login-link">
        Already registered?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>

    </div>
  </div>
);
}

export default Register;




