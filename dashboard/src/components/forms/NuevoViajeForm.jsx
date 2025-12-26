import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addViaje } from "../../redux/slices/viajesSlice";
import { toast } from "react-toastify";

function NuevoViajeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origen: "",
    destino: "",
    chofer: "",
    fechaSalida: "",
    fechaEntrada: "",
    contenedor: "",
    virada: "",
    camion: "",
    remolque: "",
    notas: "",
    estado: "Pendiente",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando formulario de nuevo viaje:");
    const viajeData = {
      ...formData,
      origen: formData.origen,
      destino: formData.destino,
      chofer: formData.chofer,
      fechaEntrada: formData.fechaEntrada.split("T")[0],
      fechaSalida: formData.fechaSalida
        ? formData.fechaSalida.split("T")[0]
        : null,
      contenedor: formData.contenedor,
      virada: formData.virada,
      camion: formData.camion,
      remolque: formData.remolque,
      notas: formData.notas,
      estado: formData.estado,
    };
    console.log(viajeData);
    await dispatch(addViaje(formData));
    setFormData({
      origen: "",
      destino: "",
      chofer: "",
      fechaSalida: "",
      fechaEntrada: "",
      contenedor: "",
      virada: "",
      camion: "",
      remolque: "",
      notas: "",
      estado: "Pendiente",
    });
    console.log("Formulario enviado:", formData);
    // llamada a la api para guardar el nuevo viaje
    navigate("/viajes");
  };
  const handleDiscard = () => {
    navigate("/viajes");
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Viaje</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Origen</label>
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
          <label className="form-label">Destino</label>
          <input
            type="text"
            className="form-control"
            name="origen"
            value={formData.origen}
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
          <label className="form-label">Fecha de Salida</label>
          <input
            type="date"
            className="form-control"
            name="fechaSalida"
            value={formData.fechaSalida}
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
          <label className="form-label">Contenedor</label>
          <input
            type="text"
            className="form-control"
            name="contenedor"
            value={formData.contenedor}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Virada</label>
          <input
            type="text"
            className="form-control"
            name="virada"
            value={formData.virada}
            onChange={handleChange}
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
          <label className="form-label">Remolque</label>
          <input
            type="text"
            className="form-control"
            name="remolque"
            value={formData.remolque}
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

        <div className="d-flex gap-2 mt-3">
          <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            toast.success("Viaje guardado correctamente", {
              position: "top-center",
            });
            navigate("/viajes");
          }}
          >
            Guardar Viaje
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleDiscard}>
            Descartar
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default NuevoViajeForm;
