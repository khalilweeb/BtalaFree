import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = (userData, token) => {
    // Normalize user data - ensure both id and _id exist
    const normalizedUser = {
      ...userData,
      id: userData.id || userData._id,
      _id: userData._id || userData.id
    };
    
    setUser(normalizedUser);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);

    // Redirect based on role
    if (normalizedUser.role === "admin") navigate("/admin/dashboard");
    else navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
