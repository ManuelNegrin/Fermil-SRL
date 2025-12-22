import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const exp = localStorage.getItem("token_exp");
  console.log("ProtectedRoute token:", token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (exp && Date.now() > Number(exp)) {
    console.log("Token expired");
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    return <Navigate to="/login" replace />;
  }

  return children;
}
