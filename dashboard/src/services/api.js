const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    method: options.method || "GET",
    headers,
    body: options.body ? options.body : null,
  };

  console.log(`API Request to ${endpoint}`, config);

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status}: ${errorText}`);
  }

  return response.json();
};
