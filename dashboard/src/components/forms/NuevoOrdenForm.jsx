import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NuevoOrdenForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fechaEntrada: "",
    tipo: "",
    descripcion: "",
    estado: "Disponible",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // llamada a la api para guardar la nueva orden
    navigate("/ordenesTaller");
  };
  const handleDiscard = () => {
    navigate("/ordenesTaller");
  };

  return (
    <div className="container mt-4">
      <h2>Nueva Orden</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        

        <div className="mb-3">
          <label className="form-label">Fecha de Entrada</label>
          <input
            type="date"
            className="form-control"
            name="fechaEntrada"
            value={formData.fechaEntrada}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Guardar Orden
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleDiscard}>
            Descartar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NuevoOrdenForm;
