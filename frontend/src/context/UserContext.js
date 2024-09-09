// ecommercestore/frontend/src/context/UserContext.js

import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/users/me")
        .then((response) => setUser(response.data))
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          toast.error("Session expired. Please log in again.");
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.info("Logged out successfully.");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
