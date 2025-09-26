import { useState } from "react";

function Vehiculos() {
  const [filtro, setFiltro] = useState("Todos");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  const vehiculos = [
    {
      id: 1,
      tipo: "Camion",
      matricula: "ACD1234",
      chofer: "Juan Perez",
      modelo: "Internacional 430",
      estado: "Disponible",
    },
    {
      id: 2,
      tipo: "Camion",
      matricula: "BCD5678",
      chofer: "Raul Gomez",
      modelo: "VW Constellation 19.320",
      estado: "En Reparacion",
    },
    {
      id: 3,
      tipo: "Remolque",
      matricula: "ATP4008",
      modelo: "Araña 40",
      estado: "Disponible",
    },
    {
      id: 4,
      tipo: "Remolque",
      matricula: "ATP4009",
      modelo: "Araña 40",
      estado: "En Uso",
    },
    {
      id: 5,
      tipo: "Camion",
      matricula: "CDE6789",
      chofer: "Pedro Gonzalez",
      modelo: "Scania R450",
      estado: "Disponible",
    },
    {
      id: 6,
      tipo: "Remolque",
      matricula: "ATP4010",
      modelo: "Camara",
      estado: "Disponible",
    },
  ];

  const toggleSeleccion = (id) => {
    setVehiculoSeleccionado(vehiculoSeleccionado === id ? null : id);
  };

  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    filtro === "Camiones"
      ? vehiculo.tipo === "Camion"
      : vehiculo.tipo === "Remolques"
      ? vehiculo.tipo === "Remolque"
      : true
  );

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2 className="mb-4">Vehiculos</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <button
            className={`btn me-2 ${
              filtro === "Todos" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFiltro("Todos")}
          >
            Todos
          </button>
          <button
            className={`btn me-2 ${
              filtro === "Camiones" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFiltro("Camiones")}
          >
            Camiones
          </button>
          <button
            className={`btn me-2 ${
              filtro === "Remolques" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFiltro("Remolques")}
          >
            Remolques
          </button>
        </div>
        <button
          className="btn btn-success ms-auto"
          onClick={() => navigate("/vehiculos/nuevovehiculo")}
        >
          Nuevo Vehiculo
        </button>
      </div>

      <ul className="list-group">
        {vehiculosFiltrados.map((vehiculo) => (
          <li
            key={vehiculo.id}
            className="list-group-item"
            onClick={() => toggleSeleccion(vehiculo.id)}
            style={{ cursor: "pointer" }}
          >
            <strong>{vehiculo.matricula}</strong>
            {vehiculoSeleccionado === vehiculo.id && (
              <div className="mt-2 text-muted">
                <p>
                  <strong>Estado:</strong> {vehiculo.estado}
                </p>
                <p>
                  <strong>Matricula:</strong> {vehiculo.matricula}
                </p>
                <p>
                  <strong>Chofer:</strong> {vehiculo.chofer}{" "}
                  {!vehiculo.chofer && "---"}
                </p>
                <p>
                  <strong>Modelo:</strong> {vehiculo.modelo}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vehiculos;
