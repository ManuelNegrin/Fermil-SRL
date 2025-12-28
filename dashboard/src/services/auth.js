import { apiFetch } from "./api";

export const login = async (email, password) => {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  return data;
};

export const register = async (email, password, name, role = "user") => {
  return apiFetch("auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name, role }),
  });
};

export const fetchUserProfile = async (token) => {
  return apiFetch("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
