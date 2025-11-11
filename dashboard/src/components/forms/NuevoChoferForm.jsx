import { useState } from "react";

function NuevoChoferForm() {
  const [formData, setFormData] = useState({
    documento: "",
    telefono: "",
    vencimientoDeLibreta: "",
    vehiculoAsignado: "",
    estado: "Disponible",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // llamada a la api para guardar el nuevo viaje
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Chofer</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Documento</label>
          <input
            type="text"
            className="form-control"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Vencimiento de Libreta</label>
          <input
            type="date"
            className="form-control"
            name="vencimientoDeLibreta"
            value={formData.vencimientoDeLibreta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Vehículo Asignado</label>
          <input
            type="text"
            className="form-control"
            name="vehiculoAsignado"
            value={formData.vehiculoAsignado}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Chofer
        </button>
      </form>
    </div>
  );
}

export default NuevoChoferForm;
