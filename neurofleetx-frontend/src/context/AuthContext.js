import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

const login = (userData, token) => {
  if (!token) return console.error("No token provided!");

  // Make sure email is stored
  const formattedUser = {
    id: userData.id,
    name: userData.name,
    email: userData.email,   // ➜ FIXED: added email
    role: userData.role
  };

  localStorage.setItem("user", JSON.stringify(formattedUser));
  localStorage.setItem("token", token);

  setUser(formattedUser);
};


  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
