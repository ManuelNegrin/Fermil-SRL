import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.username) {
      setError("El usuario es requerido");
      return;
    }
    if (!form.password) {
      setError("La contraseña es requerida");
      return;
    }

    const res = login(form);
    if (res.ok) {
      navigate("/");
    } else {
      setError(res.message || "Error de login");
    }
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
                  <input name="username" className="form-control" value={form.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" type="submit">Entrar</button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
