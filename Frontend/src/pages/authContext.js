import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if there's a token in localStorage on mount and update the state accordingly
    const token = localStorage.getItem('token');
    if (token) {
      // Ideally, verify the token here (e.g., by making an API call)
      // For now, we'll assume that having a token means the user is authenticated
      setIsAuthenticated(true);
      const userType = localStorage.getItem('userType');
      setIsAdmin(userType === 'admin');
    }
  }, []);

  const login = (isAdmin) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
