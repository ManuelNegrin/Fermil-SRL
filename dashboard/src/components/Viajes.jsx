import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Viajes() {
  const [filtro, setFiltro] = useState("Activo");
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const navigate = useNavigate();

  const viajes = [
    {
      id: 1,
      destino: "Montevideo-Melo",
      chofer: "Juan Perez",
      fechaCarga: "2025-09-30",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 2,
      destino: "Montevideo-Salto",
      chofer: "Raul Gomez",
      fechaCarga: "2025-09-30",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 3,
      destino: "Montevideo-Colonia",
      chofer: "Pedro Gonzalez",
      fechaCarga: "2025-09-30",
      fechaEntrada: "2025-10-01",
      estado: "Finalizado",
    },
    {
      id: 4,
      destino: "Montevideo-Melo",
      chofer: "Juan Gomez",
      fechaCarga: "2025-09-30",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 5,
      destino: "Montevideo-Tacuarembó",
      chofer: "Federico Pintos",
      fechaCarga: "2025-09-30",
      fechaEntrada: "2025-10-01",
      estado: "Finalizado",
    },
  ];

  const viajesFiltrados = viajes.filter((viaje) =>
    filtro === "Todo" ? true : viaje.estado === filtro
  );

  const toggleSeleccion = (id) => {
    setViajeSeleccionado(viajeSeleccionado === id ? null : id);
  };

  return (
    <div className="p-0 m-0">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2 className="mb-4">Viajes ({filtro}s)</h2>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
        {/* botones de filtro desktop */}
        <div className="d-none d-md-flex gap-2">
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
          <button
            className={`btn me-2 ${
              filtro === "Todo" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => setFiltro("Todo")}
          >
            Todos
          </button>
        </div>
        {/* botones de filtro mobile */}
        <div className="d-flex d-md-none flex-wrap gap-1 justify-content-between w-100">
          <button
            className={`btn btn-sm ${
              filtro === "Activo" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFiltro("Activo")}
          >
            Activos
          </button>
          <button
            className={`btn btn-sm ${
              filtro === "Finalizado"
                ? "btn-secondary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFiltro("Finalizado")}
          >
            Finalizados
          </button>
          <button
            className={`btn btn-sm ${
              filtro === "Todo" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => setFiltro("Todo")}
          >
            Todos
          </button>
        </div>
        <div className="d-none d-md-flex">
          <button
            className="btn btn-success ms-auto"
            onClick={() => navigate("/viajes/nuevoViaje")}
          >
            Nuevo Viaje
          </button>
        </div>
        <div className="d-flex d-md-none w-100">
          <button
            className="btn btn-success btn-sm w-100 w-md-auto"
            onClick={() => navigate("/viajes/nuevoViaje")}
          >
            Nuevo Viaje
          </button>
        </div>
      </div>

      <ul className="list-group">
        {viajesFiltrados.map((viaje) => (
          <li
            key={viaje.id}
            className="list-group-item"
            onClick={() => toggleSeleccion(viaje.id)}
            style={{ cursor: "pointer" }}
          >
            <strong>{viaje.destino}</strong> — {viaje.chofer}
            {viajeSeleccionado === viaje.id && (
              <div className="mt-2 text-muted">
                <p>
                  <strong>Fecha Carga:</strong> {viaje.fechaCarga}
                </p>
                <p>
                  <strong>Fecha Entrada:</strong> {viaje.fechaEntrada}
                </p>
                <p>
                  <strong>Camión:</strong> {viaje.camion}
                </p>
                <p>
                  <strong>Notas:</strong> {viaje.notas}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Viajes;
