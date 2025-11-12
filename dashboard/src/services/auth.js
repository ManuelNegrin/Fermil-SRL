import { apiFetch } from "./api";

export const login = async (email, password) => {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  return data;
};

export const register = async (email, password, name, role = "user") => {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name, role }),
  });
};

export const fetchUserProfile = async (token) => {
  return apiFetch("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
