import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user/me") // create this endpoint in backend
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
