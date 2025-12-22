import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userName) {
      setError("El usuario es requerido");
      return;
    }
    if (!password) {
      setError("La contraseña es requerida");
      return;
    }

    try {
      console.log("Attempting login with:", { userName, password });
      const data = await login(userName, password);
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token_exp", Date.now() + 8 * 60 * 60 * 1000); // 8 hours expiration
      setUser(data.user);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Error al iniciar sesión");
    }
  };

  const logout = (navigate) => {
    console.log("Logging out user");
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="mb-3">Iniciar sesión</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    name="username"
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" type="submit">
                    Entrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    // onClick={() => navigate(-1)}
                    onClick={() => logout(navigate)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
