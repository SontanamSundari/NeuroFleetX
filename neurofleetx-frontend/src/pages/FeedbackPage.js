import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function FeedbackPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* --- HEADER --- */}
      <div style={styles.headerBar}>
        <div>
          <h1 style={styles.dashboardTitle}>Feedback</h1>
          <div style={styles.userInfoBox}>
            <p style={styles.userLine}><strong>Name:</strong> {user.name}</p>
            <p style={styles.userLine}><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        <button onClick={() => navigate("/customer-dashboard")} style={styles.logoutBtn}>
          Back
        </button>
      </div>

      {/* --- FEEDBACK FORM --- */}
      <div style={styles.dashboardCard}>
        <form
          style={styles.feedbackForm}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for your feedback!");
            e.target.reset();
            navigate("/customer-dashboard");
          }}
        >
          <input type="text" name="name" placeholder="Your Name" style={styles.feedbackInput} required />
          <input type="email" name="email" placeholder="Your Email" style={styles.feedbackInput} required />
          <textarea name="message" placeholder="Your Feedback" style={styles.feedbackTextarea} required />
          <button type="submit" style={styles.feedbackBtn}>Submit</button>
        </form>
      </div>
    </div>
  );
}

// Reuse same styles as dashboard
const styles = {
  page: { minHeight: "100vh", width: "100vw", margin: 0, padding: "40px 20px", background: "linear-gradient(135deg, #2b1055, #7597de)", fontFamily: "Arial" },
  headerBar: { maxWidth: "1100px", margin: "0 auto 25px auto", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", padding: "15px 25px", background: "rgba(255,255,255,0.1)", borderRadius: "14px", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" },
  dashboardTitle: { margin: 0, fontSize: "30px", fontWeight: "700" },
  userInfoBox: { marginTop: "5px", fontSize: "15px" },
  userLine: { margin: "3px 0", opacity: "0.9" },
  logoutBtn: { padding: "10px 18px", backgroundColor: "#ff5252", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "bold" },
  dashboardCard: { width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "25px", borderRadius: "18px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.15)", color: "white" },
  feedbackForm: { display: "flex", flexDirection: "column", gap: "15px" },
  feedbackInput: { padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.12)", color: "white", outline: "none" },
  feedbackTextarea: { padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.12)", color: "white", minHeight: "120px", resize: "vertical", outline: "none" },
  feedbackBtn: { padding: "10px", borderRadius: "8px", border: "none", background: "#6c5ce7", color: "white", cursor: "pointer", fontWeight: "bold" },
};
