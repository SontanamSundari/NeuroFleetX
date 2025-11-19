import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Static Users
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@gmail.com" },
    { id: 2, name: "Bob", email: "bob@gmail.com" },
    { id: 3, name: "Charlie", email: "charlie@gmail.com" },
  ]);

  // Add User Form
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [showAddUser, setShowAddUser] = useState(false);

  // Static Vehicles with detailed info
  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Vehicle 1", status: "active", driver: "Alice", location: "Sector 12", tripStart: "10:30 AM" },
    { id: 2, name: "Vehicle 2", status: "active", driver: "Bob", location: "Airport", tripStart: "11:00 AM" },
    { id: 3, name: "Vehicle 3", status: "idle", location: "Depot", fuel: "80%", maintenance: "OK" },
    { id: 4, name: "Vehicle 4", status: "active", driver: "Charlie", location: "Mall", tripStart: "11:30 AM" },
    { id: 5, name: "Vehicle 5", status: "idle", location: "Garage", fuel: "60%", maintenance: "Due" },
  ]);

  // Add User
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "" });
    setShowAddUser(false);
  };

  // Delete User
  const handleDelete = (id) => setUsers(users.filter((u) => u.id !== id));

  // Separate active and idle vehicles
  const activeVehicles = vehicles.filter((v) => v.status === "active");
  const idleVehicles = vehicles.filter((v) => v.status === "idle");

  return (
    <div style={styles.page}>
      {/* --- HEADER --- */}
      <div style={styles.headerBar}>
        <div>
          <h1 style={styles.dashboardTitle}>Admin Dashboard</h1>
          <div style={styles.userInfoBox}>
            <p style={styles.userLine}><strong>Name:</strong> {user.name}</p>
            <p style={styles.userLine}><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate("/"); }}
          style={styles.logoutBtn}
        >
          Logout
        </button>
      </div>

      {/* --- MAIN CARD --- */}
      <div style={styles.dashboardCard}>
        <h3 style={styles.sectionTitle}>Modules</h3>
        <div style={styles.moduleGrid}>

          {/* Manage Users */}
          <div style={styles.cardModule}>
            <span style={styles.cardIcon}>👥</span>
            <h3 style={{ margin: "5px 0" }}>Manage Users</h3>
            <p style={{ margin: 0 }}>View & delete users</p>

            <div style={{ marginTop: "10px" }}>
              {/* List Users */}
              {users.map((u) => (
                <div key={u.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span>{u.name} ({u.email})</span>
                  <button onClick={() => handleDelete(u.id)} style={styles.deleteBtn}>Delete</button>
                </div>
              ))}

              {/* Add User Button */}
              {!showAddUser && (
                <button onClick={() => setShowAddUser(true)} style={{ ...styles.addBtn, marginTop: "10px" }}>
                  Add User
                </button>
              )}

              {/* Add User Form */}
              {showAddUser && (
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    style={styles.inputSmall}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    style={styles.inputSmall}
                  />
                  <button onClick={handleAddUser} style={styles.addBtn}>Add</button>
                </div>
              )}
            </div>
          </div>

          {/* Active Vehicles */}
          <div style={styles.cardModule}>
            <span style={styles.cardIcon}>🚗</span>
            <h3 style={{ margin: "5px 0" }}>Active Vehicles</h3>
            {activeVehicles.length === 0 ? (
              <p>No active vehicles</p>
            ) : (
              <table style={styles.vehicleTable}>
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Driver</th>
                    <th>Location</th>
                    <th>Trip Start</th>
                  </tr>
                </thead>
                <tbody>
                  {activeVehicles.map((v) => (
                    <tr key={v.id}>
                      <td>{v.name}</td>
                      <td>{v.driver}</td>
                      <td>{v.location}</td>
                      <td>{v.tripStart}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Idle Vehicles */}
          <div style={styles.cardModule}>
            <span style={styles.cardIcon}>🛑</span>
            <h3 style={{ margin: "5px 0" }}>Idle Vehicles</h3>
            {idleVehicles.length === 0 ? (
              <p>No idle vehicles</p>
            ) : (
              <table style={styles.vehicleTable}>
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Location</th>
                    <th>Fuel</th>
                    <th>Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {idleVehicles.map((v) => (
                    <tr key={v.id}>
                      <td>{v.name}</td>
                      <td>{v.location}</td>
                      <td>{v.fuel}</td>
                      <td>{v.maintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ----------------------------
// STYLES
// ----------------------------
const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: "40px 20px",
    overflowX: "hidden",
    background: "linear-gradient(135deg, #2b1055, #7597de)",
  },

  headerBar: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto 25px auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    padding: "15px 25px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "14px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  dashboardTitle: { margin: 0, fontSize: "30px", fontWeight: "700" },
  userInfoBox: { marginTop: "5px", fontSize: "15px" },
  userLine: { margin: "3px 0", opacity: "0.9" },

  logoutBtn: {
    padding: "10px 18px",
    backgroundColor: "#ff5252",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },

  dashboardCard: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
  },

  sectionTitle: { margin: "10px 0 20px 0", fontWeight: 600, fontSize: "22px" },
  moduleGrid: { display: "flex", gap: "20px", flexWrap: "wrap" },

  cardModule: {
    padding: "25px",
    borderRadius: "14px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
    width: "350px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
  },

  cardIcon: { fontSize: "38px", marginBottom: "10px" },

  deleteBtn: {
    padding: "4px 8px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },

  inputSmall: {
    width: "calc(50% - 5px)",
    padding: "6px 8px",
    marginRight: "5px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    outline: "none",
  },

  addBtn: {
    padding: "6px 10px",
    marginTop: "5px",
    background: "#6c5ce7",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  vehicleTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },

  vehicleTableThTd: {
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "6px 8px",
    textAlign: "left",
  },
};
