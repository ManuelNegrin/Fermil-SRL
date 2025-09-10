import { useState } from "react";

function Viajes() {
  const [filtro, setFiltro] = useState("Activo");
  const viajes = [
    {
      id: 1,
      destino: "Montevideo-Melo",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 2,
      destino: "Montevideo-Colonia",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
      estado: "Finalizado",
    },
    {
      id: 3,
      destino: "Montevideo-Tacuarembó",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 4,
      destino: "Montevideo-Melo",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
      estado: "Finalizado",
    },
    {
      id: 5,
      destino: "Montevideo-Rivera",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 6,
      destino: "Montevideo-Colonia",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
      estado: "Finalizado",
    },
  ];
  const viajesFiltrados = viajes.filter((viaje) => viaje.estado === filtro);

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2 className="mb-4">Viajes ({filtro}s)</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <button
            className={`btn me-2 ${
              filtro === "Activo" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFiltro("Activo")}
          >
            Activos
          </button>
          <button
            className={`btn me-2 ${
              filtro === "Finalizado"
                ? "btn-secondary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFiltro("Finalizado")}
          >
            Finalizados
          </button>
        </div>
        <button className="btn btn-success ms-auto">Nuevo Viaje</button>
      </div>

      <ul className="list-group">
        {viajesFiltrados.map((viaje) => (
          <li key={viaje.id} className="list-group-item">
            <strong>{viaje.destino}</strong> — {viaje.chofer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Viajes;
