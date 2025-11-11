import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function VehiculoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehiculos = [
    { 
        id: 1, 
        tipo: "Camion", 
        matricula: "ACD1234", 
        chofer: "Juan Perez", 
        modelo: "Internacional 430", 
        estado: "Disponible" 
    },
    { 
        id: 2, 
        tipo: "Camion", 
        matricula: "BCD5678", 
        chofer: "Raul Gomez", 
        modelo: "VW Constellation 19.320", 
        estado: "En Reparacion" 
    },
  ];

  const v = vehiculos.find((x) => x.id === parseInt(id));

  const initialForm = {
    tipo: v?.tipo || "",
    matricula: v?.matricula || "",
    chofer: v?.chofer || "",
    modelo: v?.modelo || "",
    estado: v?.estado || "Disponible",
  };

  const [form, setForm] = useState(initialForm);

  if (!v) {
    return (
      <div className="container mt-4">
        <h3 className="text-danger">Vehículo no encontrado</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/vehiculos")}>Volver</button>
      </div>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => { console.log("Guardar vehiculo", id, form); navigate("/vehiculos"); };
  const handleDelete = () => { if (!confirm("¿Eliminar vehículo?")) return; console.log("Eliminar vehiculo", id); navigate("/vehiculos"); };

  const handleDiscard = () => {
    if (JSON.stringify(form) === JSON.stringify(initialForm)) return;
    if (!confirm("Descartar cambios?")) return;
    setForm(initialForm);
  };

  return (
    <div className="container mt-4">
      <h2>Editar Vehículo #{id}</h2>
      <div className="card shadow mt-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Tipo</label>
              <input className="form-control" name="tipo" value={form.tipo} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Matrícula</label>
              <input className="form-control" name="matricula" value={form.matricula} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Modelo</label>
              <input className="form-control" name="modelo" value={form.modelo} onChange={handleChange} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label">Chofer asignado</label>
              <input className="form-control" name="chofer" value={form.chofer} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Estado</label>
              <select className="form-select" name="estado" value={form.estado} onChange={handleChange}>
                <option>Disponible</option>
                <option>En Reparacion</option>
                <option>En Uso</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={handleSave}>Guardar cambios</button>
              <button className="btn btn-secondary" onClick={handleDiscard}>Descartar cambios</button>
            </div>
            <div>
              <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculoEditar;
