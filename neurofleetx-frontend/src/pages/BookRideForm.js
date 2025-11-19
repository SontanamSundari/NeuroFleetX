// BookRideForm.jsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { bookRide } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function BookRideForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    time: "",
    vehicleType: "CAR",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login required.");

    try {
      await bookRide({
        userId: user.id,
        pickupLocation: form.pickupLocation,
        dropLocation: form.dropLocation,
        vehicleType: form.vehicleType,
        bookingTime: form.time,
      });

      alert("Ride booked successfully!");
      navigate("/customer-dashboard", { state: { reload: true } });
    } catch (err) {
      alert("Failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Book a Ride</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Pickup Location"
            value={form.pickupLocation}
            onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
            required
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Drop Location"
            value={form.dropLocation}
            onChange={(e) => setForm({ ...form, dropLocation: e.target.value })}
            required
            style={styles.input}
          />

          <select
            value={form.vehicleType}
            onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
            style={styles.input}
          >
            <option style={styles.option} value="CAR">Car</option>
            <option style={styles.option} value="BIKE">Bike</option>
            <option style={styles.option} value="AUTO">Auto</option>
          </select>

          <input
            type="datetime-local"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
            🚗 Book Ride
          </button>
        </form>
      </div>
    </div>
  );
}

// Styles same theme as dashboard
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2b1055, #7597de)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    padding: "30px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
  },

  title: { margin: 0, textAlign: "center", fontWeight: 700, fontSize: "26px" },

  form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    outline: "none",
  },

  option: {
    color: "black",
  },

  submitBtn: {
    padding: "14px",
    backgroundColor: "#6c5ce7",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
styles.input["::placeholder"] = {
  color: "black",
  opacity: 1,
};