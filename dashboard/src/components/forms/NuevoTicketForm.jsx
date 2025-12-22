import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NuevoTicketForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehiculo: "",
    viaje: "",
    litrosCombustible: "",
    fecha: "",
    importeTotal: "",
    proveedor: "",
    kilometraje: "",
    observaciones: "",
    estado: "Disponible",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // llamada a la api para guardar el nuevo ticket
    navigate("/consumos/tickets");
  };
  const handleDiscard = () => {
    navigate("/consumos/tickets");
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Ticket</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Vehículo</label>
          <input
            type="text"
            className="form-control"
            name="vehiculo"
            value={formData.vehiculo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Viaje</label>
          <input
            type="text"
            className="form-control"
            name="viaje"
            value={formData.viaje}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Litros de Combustible</label>
          <input
            type="number"
            className="form-control"
            name="litrosCombustible"
            value={formData.litrosCombustible}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Importe Total</label>
          <input
            type="number"
            className="form-control"
            name="importeTotal"
            value={formData.importeTotal}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Proveedor</label>
          <input
            type="text"
            className="form-control"
            name="proveedor"
            value={formData.proveedor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Kilometraje</label>
          <input
            type="number"
            className="form-control"
            name="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Observaciones</label>
          <textarea
            className="form-control"
            name="observaciones"
            rows="3"
            value={formData.observaciones}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Guardar Ticket
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleDiscard}>
            Descartar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NuevoTicketForm;
