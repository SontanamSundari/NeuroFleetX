import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserRides } from "../api/api";

export default function MyRides() {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    if (!user) return;

    getUserRides(user.id)
      .then((res) => setRides(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div style={styles.container}>
      <h2>Your Rides</h2>
      <div style={styles.list}>
        {rides.map((ride) => (
          <div key={ride.id} style={styles.card}>
            <p><strong>From:</strong> {ride.pickupLocation}</p>
            <p><strong>To:</strong> {ride.dropLocation}</p>
            <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
            <p><strong>Time:</strong> {ride.bookingTime ? new Date(ride.bookingTime).toLocaleString() : "Not set"}</p>
            <p style={{
              ...styles.status,
              color:
                ride.status === "BOOKED" ? "blue" :
                ride.status === "IN_PROGRESS" ? "orange" :
                ride.status === "COMPLETED" ? "green" :
                "gray"
            }}>
              Status: {ride.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    color: "#fff"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  card: {
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    padding: "20px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontWeight: 500,
    lineHeight: "1.6"
  },
  status: {
    fontWeight: "bold"
  }
};
