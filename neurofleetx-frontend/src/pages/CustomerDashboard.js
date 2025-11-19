import React, { useEffect, useState } from "react";
import { getUserRides } from "../api/api";
import { useAuth } from "../context/AuthContext";
import RideCard from "../components/RideCard";
import { useNavigate, useLocation } from "react-router-dom";

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const [rides, setRides] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // Feedback form state
  const navigate = useNavigate();
  const location = useLocation();

  // Ride Stats derived from rides array
  const rideStats = {
    total: rides.length,
    active: rides.filter(r => r.status === "active").length,
    completed: rides.filter(r => r.status === "completed").length,
  };

  const loadRides = async () => {
    if (!user) return;
    try {
      const res = await getUserRides(user.id);
      setRides(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert("Failed to load rides: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (user) loadRides();
  }, [user]);

  useEffect(() => {
    if (location.state?.reload) {
      loadRides();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleBookRide = () => {
    navigate("/book-ride", { state: { fromDashboard: true } });
  };

  const handleBookFavorite = (fav) => {
    // Create a new ride object dynamically with proper From, To, Time
    const newRide = {
      id: Date.now(),
      vehicle: "Auto-Assigned Vehicle",
      pickup: "Current Location",
      drop: fav.name,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "active",
    };

    // Add to rides state
    setRides([newRide, ...rides]);
  };

  return (
    <div style={styles.page}>
      {/* --- TOP HEADER --- */}
      <div style={styles.headerBar}>
        <div>
          <h1 style={styles.dashboardTitle}>Customer Dashboard</h1>
          <div style={styles.userInfoBox}>
            <p style={styles.userLine}><strong>Name:</strong> {user.name}</p>
            <p style={styles.userLine}><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </div>

      {/* --- MAIN SECTION --- */}
      <div style={styles.dashboardCard}>
        {/* Ride Stats */}
        <h3 style={styles.sectionTitle}>Ride Stats</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>Total Rides: {rideStats.total}</div>
          <div style={styles.statCard}>Active Rides: {rideStats.active}</div>
          <div style={styles.statCard}>Completed Rides: {rideStats.completed}</div>
        </div>

        {/* Modules */}
        <h3 style={styles.sectionTitle}>Modules</h3>
        <div style={styles.moduleGrid}>
          <div style={styles.cardModule} onClick={handleBookRide}>
            <span style={styles.cardIcon}>🚗</span>
            <h3 style={{ margin: "5px 0" }}>Book a New Ride</h3>
            <p style={{ margin: 0 }}>Schedule your ride instantly</p>
          </div>

{/* Feedback Module */}
<div
  style={styles.cardModule}
  onClick={() => navigate("/feedback")} // navigate to new Feedback page
>
  <span style={styles.cardIcon}>📝</span>
  <h3 style={{ margin: "5px 0" }}>Feedback</h3>
  <p style={{ margin: 0 }}>Give us your feedback</p>
</div>

        </div>

        {/* Your Rides */}
        <h3 style={styles.sectionTitle}>Your Rides</h3>
        <div style={styles.ridesList}>
          {rides.length === 0 && <p>No rides booked yet.</p>}
          {rides.map((r) => (
            <RideCard ride={r} key={r.id} />
          ))}
        </div>

        {/* --- MAP SECTION --- */}
        <h3 style={styles.sectionTitle}>Map</h3>
        <div style={styles.mapContainer}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.9537353155047!3d-37.81627977975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f5b4b3%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1618300000000!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

// -------------------- STYLES --------------------
const styles = {
  page: { minHeight: "100vh", width: "100vw", margin: 0, padding: "40px 20px", background: "linear-gradient(135deg, #2b1055, #7597de)", fontFamily: "Arial" },
  headerBar: { maxWidth: "1100px", margin: "0 auto 25px auto", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", padding: "15px 25px", background: "rgba(255,255,255,0.1)", borderRadius: "14px", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" },
  dashboardTitle: { margin: 0, fontSize: "30px", fontWeight: "700" },
  userInfoBox: { marginTop: "5px", fontSize: "15px" },
  userLine: { margin: "3px 0", opacity: "0.9" },
  logoutBtn: { padding: "10px 18px", backgroundColor: "#ff5252", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "bold" },
  dashboardCard: { width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "25px", borderRadius: "18px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.15)", color: "white" },
  sectionTitle: { margin: "10px 0 20px 0", fontWeight: 600, fontSize: "22px" },
  statsGrid: { display: "flex", gap: "20px", marginBottom: "20px" },
  statCard: { padding: "15px", borderRadius: "12px", background: "rgba(255,255,255,0.12)", flex: 1, textAlign: "center", fontWeight: "bold" },
  moduleGrid: { display: "flex", gap: "20px" },
  cardModule: { padding: "25px", borderRadius: "14px", textAlign: "center", cursor: "pointer", transition: "0.3s", width: "260px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", color: "white" },
  cardIcon: { fontSize: "38px", marginBottom: "10px" },
  ridesList: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "15px", marginBottom: "20px" },
  inputSmall: { width: "100%", padding: "6px 8px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.12)", color: "white", outline: "none" },
  addBtn: { padding: "6px 10px", marginTop: "5px", background: "#6c5ce7", border: "none", borderRadius: "5px", color: "white", cursor: "pointer" },
  mapContainer: { marginTop: "15px", borderRadius: "12px", overflow: "hidden" },
};
