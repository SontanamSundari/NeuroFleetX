import React from "react";

export default function RideCard({ ride }) {
  return (
    <div style={{
      padding: "12px",
      border: "1px solid #aaa",
      marginBottom: "10px",
      borderRadius: "6px"
    }}>
      <p><b>From:</b> {ride.pickupLocation}</p>
      <p><b>To:</b> {ride.dropLocation}</p>
      <p><b>Status:</b> {ride.status}</p>
      <p><b>Time:</b> {ride.bookingTime ? new Date(ride.bookingTime).toLocaleString() : "Not Set"}</p>
    </div>
  );
}
