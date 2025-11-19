//import React from "react";
//import { Link } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
//
//export default function Navbar() {
//  const { user, logout } = useAuth();
//
//  return (
//    <nav style={{ padding: "15px", background: "#222", color: "white" }}>
//      <h2>NeuroFleetX</h2>
//
//      {user ? (
//        <>
//          <button onClick={logout}>Logout</button>
//        </>
//      ) : (
//        <>
//          <Link to="/">Login</Link> | <Link to="/register">Register</Link>
//        </>
//      )}
//    </nav>
//  );
//}
