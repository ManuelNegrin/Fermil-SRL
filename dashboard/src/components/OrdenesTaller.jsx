import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrdenesTaller() {
  const navigate = useNavigate();
  const [ordenes] = useState([
    {
      id: 1,
      vehiculo: "ACD1234 - Camión Internacional 430",
      trabajo: "Cambio de frenos",
      fechaIngreso: "2025-09-01",
      fechaEgreso: "2025-09-10",
      estado: "En proceso",
      observaciones: "Cintas nuevas",
    },
    {
      id: 2,
      vehiculo: "BCD5678 - VW Constellation",
      trabajo: "Servicio completo",
      fechaIngreso: "2025-09-05",
      fechaEgreso: "2025-09-15",
      estado: "Finalizado",
      observaciones: "Listo para retirar",
    },
    {
      id: 3,
      vehiculo: "ATP4008 - Remolque Araña 40",
      trabajo: "Cambio de neumáticos",
      fechaIngreso: "2025-09-08",
      fechaEgreso: "2025-09-12",
      estado: "Pendiente",
      observaciones: "Esperando repuestos",
    },
  ]);

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2 className="mb-4">Ordenes de Taller</h2>
        <button
          className="btn btn-success ms-auto"
          onClick={() => navigate("ordenesTaller/nuevaOrden")}
        >
          Nueva Orden
        </button>
      </div>

      {/* Vista tabla (desktop) */}
      <div className="d-none d-md-block">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehículo</th>
              <th>Trabajo</th>
              <th>Fecha Ingreso</th>
              <th>Estado</th>
              <th>Fecha Egreso</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr
                key={orden.id}
                onClick={() => navigate(`/ordenesTaller/${orden.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{orden.id}</td>
                <td>{orden.vehiculo}</td>
                <td>{orden.trabajo}</td>
                <td>{orden.fechaIngreso}</td>
                <td>{orden.estado}</td>
                <td>{orden.fechaEgreso}</td>
                <td>{orden.observaciones}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista cards (mobile) */}
      <div className="d-md-none">
        {ordenes.map((orden) => (
          <div
            key={orden.id}
            className="card mb-3 shadow-sm"
            onClick={() => navigate(`/ordenesTaller/${orden.id}`)}
          >
            <div className="card-body">
              <h5 className="card-title">{orden.vehiculo}</h5>
              <p className="card-text">
                <strong>Trabajo:</strong> {orden.trabajo} <br />
                <strong>Fecha Ingreso:</strong> {orden.fechaIngreso} <br />
                <strong>Fecha Salida:</strong> {orden.fechaEgreso} <br />
                <strong>Estado:</strong> {orden.estado} <br />
                <strong>Observaciones:</strong> {orden.observaciones}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdenesTaller;
