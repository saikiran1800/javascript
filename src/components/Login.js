import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const fetchUsers = async () => [
    { email: "admin@gmail.com", password: "Admin@123" },
    { email: "user@gmail.com", password: "user@123" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    const users = await fetchUsers();
    const userFound = users.find(
      (user) => user.email === form.email && user.password === form.password
    );
    if (userFound) 
      
      onLogin(userFound.email);
      navigate("/dashboard");
    } else {
      alert("Invalid username & password");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(https://t4.ftcdn.net/jpg/02/86/73/71/360_F_286737135_FNEDjbyt7Y33eZ3WUpvY1OkUIUQua4ff.jpg)`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4"
        style={{
          width: 500,
          height: 400,
          backgroundImage:
            "url(https://png.pngtree.com/background/20250207/original/pngtree-soft-pastel-floral-design-light-blue-background-picture-image_16257054.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h2 className="text-center mb-4">LOGIN</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "none",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#f0ad4e",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            <a
              href="/forget"
              style={{ color: "#f0ad4e", textDecoration: "none" }}
            >
              Forgot Password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
