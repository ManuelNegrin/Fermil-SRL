import { useState } from "react";
import { useNavigate } from "react-router";

function Viajes() {
  const [filtro, setFiltro] = useState("Activo");
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const navigate = useNavigate();

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
      destino: "Montevideo-Salto",
      chofer: "Raul Gomez",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 3,
      destino: "Montevideo-Colonia",
      chofer: "Pedro Gonzalez",
      fechaEntrada: "2025-10-01",
      estado: "Finalizado",
    },
    {
      id: 4,
      destino: "Montevideo-Melo",
      chofer: "Juan Gomez",
      fechaEntrada: "2025-10-01",
      estado: "Activo",
    },
    {
      id: 5,
      destino: "Montevideo-Tacuarembó",
      chofer: "Federico Pintos",
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
          <button
            className={`btn me-2 ${
              filtro === "Todo" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => setFiltro("Todo")}
          >
            Todos
          </button>
        </div>
        <button
          className="btn btn-success ms-auto"
          onClick={() => navigate("/viajes/nuevoViaje")}
        >
          Nuevo Viaje
        </button>
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
                  <strong>Fecha:</strong> {viaje.fechaEntrada}
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
