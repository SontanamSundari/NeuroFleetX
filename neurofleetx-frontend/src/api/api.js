import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;

// Auth
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// Rides
export const bookRide = (data) => API.post("/rides/book", data);
export const getUserRides = (userId) => API.get(`/rides/${userId}`);

// Admin-specific APIs
export const getDriverRides = () => API.get("/admin/rides"); // GET all rides
export const updateRideStatus = (rideId, status) =>
  API.put(`/rides/${rideId}/status/${status}`); // PUT ride status
export const deleteRide = (rideId) => API.delete(`/admin/delete/${rideId}`);
