// AuthPage.jsx

import React, { useState } from "react";
import { loginUser, registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "CUSTOMER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Login logic
        const res = await loginUser(form);
        const token = res.data.token || res.data.accessToken;
        const userData = res.data.user || {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        };

        login(userData, token);

        // Redirect based on role
        if (userData.role === "CUSTOMER") navigate("/customer-dashboard");
        else navigate("/admin-dashboard");

      } else {
        // Registration logic
        await registerUser(form);
        alert("Registered successfully!");

        // Auto-login after registration
        const res = await loginUser({ email: form.email, password: form.password });
        const token = res.data.token || res.data.accessToken;
        const userData = res.data.user || {
          id: res.data.id,
          name: form.name,
          email: form.email,
          role: form.role,
        };

        login(userData, token);

        // Redirect based on role
        if (userData.role === "CUSTOMER") navigate("/customer-dashboard");
        else navigate("/admin-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>NeuroFleetX</h1>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={styles.input}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
            required
          />

          {!isLogin && (
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={styles.input}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          )}

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.submitBtn}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2b1055, #7597de)",
    fontFamily: "Arial",
  },

  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.15)",
    textAlign: "center",
    color: "white",
  },

  heading: {
    marginBottom: "15px",
    fontSize: "30px",
    fontWeight: "bold",
  },

  form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    outline: "none",
  },

  submitBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#6c5ce7",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },

  toggleText: { marginTop: "15px", fontSize: "14px", color: "#eee" },

  toggleLink: { color: "#bb86fc", cursor: "pointer", fontWeight: "bold" },

  error: { color: "#ff6b6b", fontSize: "14px" },
};
