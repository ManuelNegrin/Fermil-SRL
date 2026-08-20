const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const key = "fermil.platform.session";
export const readSession = () => { try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; } };
export const clearSession = () => localStorage.removeItem(key);
export const request = async (path, options = {}) => {
  const session = readSession();
  const response = await fetch(`${baseUrl}${path}`, { method: options.method || "GET", headers: { Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}), ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}) }, body: options.body ? JSON.stringify(options.body) : undefined });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "No se pudo completar la solicitud.");
  return payload;
};
export const signIn = async (email, password) => {
  const login = await request("/api/auth/login", { method: "POST", body: { email, password } });
  localStorage.setItem(key, JSON.stringify({ token: login.token, user: login.user }));
  const profile = await request("/api/auth/me");
  if (!profile.isPlatformAdmin) { clearSession(); throw new Error("Esta cuenta no es superadministradora."); }
  localStorage.setItem(key, JSON.stringify({ token: login.token, user: { ...login.user, ...profile } }));
  return profile;
};
