import { useState } from "react";

function NuevoViajeForm() {
  const [formData, setFormData] = useState({
    destino: "",
    chofer: "",
    fechaEntrada: "",
    estado: "Activo",
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
      <h2>Nuevo Viaje</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Destino</label>
          <input
            type="text"
            className="form-control"
            name="destino"
            value={formData.destino}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Chofer</label>
          <input
            type="text"
            className="form-control"
            name="chofer"
            value={formData.chofer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Carga</label>
          <input
            type="date"
            className="form-control"
            name="fechaCarga"
            value={formData.fechaCarga}
            onChange={handleChange}
            required
          />
        </div>

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
          <label className="form-label">Camión</label>
          <input
            type="text"
            className="form-control"
            name="camion"
            value={formData.camion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notas</label>
          <textarea
            className="form-control"
            name="notas"
            rows="3"
            value={formData.notas}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Viaje
        </button>
      </form>
    </div>
  );
}

export default NuevoViajeForm;
