import { apiFetch } from "./api";

export const login = (email, password) => apiFetch("/api/auth/login", {
  method: "POST",
  body: { email, password },
});

export const getCurrentUser = () => apiFetch("/api/auth/me");
