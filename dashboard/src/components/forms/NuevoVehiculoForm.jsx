import { useState } from "react";

function NuevoVehiculoForm() {
  const [formData, setFormData] = useState({
    matricula: "",
    chofer: "",
    modelo: "",
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
      <h2>Nuevo Vehículo</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Matrícula</label>
          <input
            type="text"
            className="form-control"
            name="matricula"
            value={formData.matricula}
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
          <label className="form-label">Modelo</label>
          <input
            type="text"
            className="form-control"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Vehículo
        </button>
      </form>
    </div>
  );
}

export default NuevoVehiculoForm;
