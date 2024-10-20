import { createContext, useState } from "react";

// Initialize AuthContext with null
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("auth_token");
  });

  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("auth_token");
  });

  const login = (token) => {
    setAuthToken(token);
    setLoggedIn(true);
    localStorage.setItem("auth_token", token);
    localStorage.setItem("loggedIn", "true");
  };

  const logout = () => {
    setAuthToken(null);
    setLoggedIn(false);
    localStorage.removeItem("auth_token");
    localStorage.setItem("loggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
