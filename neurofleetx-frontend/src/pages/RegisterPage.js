//import React, { useState } from "react";
//import { registerUser } from "../api/api";
//import { useNavigate } from "react-router-dom";
//
//export default function RegisterPage() {
//  const [form, setForm] = useState({
//    name: "",
//    email: "",
//    role: "CUSTOMER",
//    password: ""
//  });
//
//  const navigate = useNavigate();
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    try {
//      await registerUser(form);
//      alert("Registered successfully!");
//      navigate("/login");
//    } catch (err) {
//      alert("Registration failed!");
//      console.error(err);
//    }
//  };
//
//  return (
//    <div style={styles.container}>
//      <h2>Register</h2>
//
//      <form onSubmit={handleSubmit} style={styles.form}>
//        <input
//          type="text"
//          placeholder="Name"
//          value={form.name}
//          onChange={(e) => setForm({ ...form, name: e.target.value })}
//          style={styles.input}
//        />
//
//        <input
//          type="email"
//          placeholder="Email"
//          value={form.email}
//          onChange={(e) => setForm({ ...form, email: e.target.value })}
//          style={styles.input}
//        />
//
//        <select
//          value={form.role}
//          onChange={(e) => setForm({ ...form, role: e.target.value })}
//          style={styles.input}
//        >
//          <option value="CUSTOMER">Customer</option>
//          <option value="DRIVER">Driver</option>
//        </select>
//
//        <input
//          type="password"
//          placeholder="Password"
//          value={form.password}
//          onChange={(e) => setForm({ ...form, password: e.target.value })}
//          style={styles.input}
//        />
//
//        <button type="submit" style={styles.registerBtn}>
//          Register
//        </button>
//      </form>
//    </div>
//  );
//}
//
//const styles = {
//  container: {
//    maxWidth: "400px",
//    margin: "50px auto",
//    padding: "30px",
//    border: "1px solid #ddd",
//    borderRadius: "10px",
//    textAlign: "center",
//    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
//  },
//  form: {
//    display: "flex",
//    flexDirection: "column",
//    gap: "15px",
//  },
//  input: {
//    padding: "10px",
//    borderRadius: "5px",
//    border: "1px solid #ccc",
//    fontSize: "16px",
//  },
//  registerBtn: {
//    padding: "12px",
//    borderRadius: "5px",
//    border: "none",
//    backgroundColor: "#28a745",
//    color: "white",
//    fontSize: "16px",
//    cursor: "pointer",
//  },
//};
