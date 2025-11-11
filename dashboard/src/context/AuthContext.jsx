import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("fermil_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("fermil_user", JSON.stringify(user));
    else localStorage.removeItem("fermil_user");
  }, [user]);

  const login = ({ username, password }) => {
    // simple demo auth: admin / admin123
    if (username === "admin" && password === "admin123") {
      const u = { username: "admin", displayName: "Administrador" };
      setUser(u);
      return { ok: true, user: u };
    }
    return { ok: false, message: "Credenciales inválidas" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
