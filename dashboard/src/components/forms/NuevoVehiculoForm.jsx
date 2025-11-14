import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addVehicle } from "../../redux/slices/vehiclesSlice";
import { toast } from "react-toastify";

function NuevoVehiculoForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matricula: "",
    tipo: "",
    marca: "",
    modelo: "",
    estado: "Disponible",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addVehicle(formData));
    setFormData({
      matricula: "",
      tipo: "",
      marca: "",
      modelo: "",
      estado: "Disponible",
    });
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
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            name="marca"
            value={formData.marca}
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
            value={formData.modelo || ""}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            toast.success("Vehículo guardado correctamente", {
              position: "top-center",
            });
            navigate("/vehiculos");
          }}
        >
          Guardar Vehículo
        </button>
      </form>
    </div>
  );
}

export default NuevoVehiculoForm;
