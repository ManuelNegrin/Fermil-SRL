import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editViaje, removeViaje } from "../../../redux/slices/viajesSlice";

function ViajeEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viajes = useSelector((state) => state.viajes.list);
  const v = viajes.find((x) => x.id === parseInt(id));

  const [form, setForm] = useState({
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

  const [loading, setLoading] = useState(!viajes);
  useEffect(() => {
    if (viajes) setLoading(false);
  }, [viajes]);

  useEffect(() => {
    if (v) {
      setForm({
        origen: v?.origen || "",
        destino: v?.destino || "",
        chofer: v?.chofer || "",
        camion: v?.camion || "",
        remolque: v?.remolque || "",
        fechaSalida: v?.fechaSalida.t("T")[0] || "",
        fechaEntrada: v?.fechaEntrada || "",
        virada: v?.virada || "",
        contenedor: v?.contenedor || "",
        notas: v?.notas || "",
        estado: v?.estado || "Activo",
      });
    }
  }, [v]);

  if (!v) {
    return (
      <div className="container mt-4">
        <h3 className="text-danger">Viaje no encontrado</h3>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/viajes")}
        >
          Volver
        </button>
      </div>
    );
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await dispatch(editViaje({ id, viajeData: form }));
    navigate("/viajes");
  };

  const handleDelete = async () => {
    await dispatch(removeViaje(id));
    navigate("/viajes");
  };

  const handleDiscard = () => {
    if (!confirm("Descartar cambios?")) return;
    setForm({
      origen: v.origen || "",
      destino: v.destino || "",
      chofer: v.chofer || "",
      camion: v.camion || "",
      remolque: v.remolque || "",
      fechaSalida: v.fechaSalida || "",
      fechaEntrada: v.fechaEntrada || "",
      estado: v.estado || "Activo",
    });
    navigate("/viajes");
  };

  return (
    <div className="container mt-4">
      <h2>Editar Viaje #{v.virada}</h2>
      <div className="card shadow mt-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Origen</label>
              <input
                className="form-control"
                name="origen"
                value={form.origen}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Destino</label>
              <input
                className="form-control"
                name="destino"
                value={form.destino}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label">Camion</label>
              <input
                className="form-control"
                name="camion"
                value={form.camion}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Remolque</label>
              <input
                className="form-control"
                name="remolque"
                value={form.remolque}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label">Fecha de Entrada</label>
              <input
                type="date"
                className="form-control"
                name="fechaSalida"
                value={form.fechaSalida}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Chofer</label>
              <input
                className="form-control"
                name="chofer"
                value={form.chofer}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label">Fecha de Salida</label>
              <input
                type="date"
                className="form-control"
                name="fechaEntrada"
                value={form.fechaEntrada}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                name="estado"
                value={form.estado}
                onChange={handleChange}
              >
                <option>Pendiente</option>
                <option>Activo</option>
                <option>Finalizado</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={handleSave}>
                Guardar cambios
              </button>
              <button className="btn btn-secondary" onClick={handleDiscard}>
                Descartar cambios
              </button>
            </div>
            <div>
              <button className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViajeEditar;
