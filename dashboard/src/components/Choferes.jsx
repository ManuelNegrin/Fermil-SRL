import { useState } from "react";

function Choferes() {
  const [filtro, setFiltro] = useState("Todos");
  const [choferSeleccionado, setChoferSeleccionado] = useState(null);

  const choferes = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Perez",
      ci: "3.456.456-7",
      telefono: "098752345",
      fechaNacimiento: "10/05/1980",
      fechaLibreta: "10/09/2026",
      estado: "Disponible",
      vehiculo: "ACD1234",
    },
    {
      id: 2,
      nombre: "Raul",
      apellido: "Gomez",
      ci: "5.678.678-9",
      telefono: "098752345",
      fechaNacimiento: "10/08/1978",
      fechaLibreta: "18/02/2029",
      estado: "En viaje",
      vehiculo: "BCD5678",
    },
    {
      id: 3,
      nombre: "Federico",
      apellido: "Gutierrez",
      ci: "4.567.567-8",
      telefono: "098752345",
      fechaNacimiento: "10/08/1978",
      fechaLibreta: "18/02/2029",
      estado: "Disponible",
      vehiculo: "CDE6789",
    },
  ];

  const toggleSeleccion = (id) => {
    setChoferSeleccionado(choferSeleccionado === id ? null : id);
  };

  const choferesFiltrados = choferes.filter((chofer) =>
    filtro === "Disponibles"
      ? chofer.estado === "Disponible"
      : filtro === "En viaje"
      ? chofer.estado === "En viaje"
      : filtro === "Licencia"
      ? chofer.estado === "Licencia"
      : true
  );

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2 className="mb-4">Choferes</h2>
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
              filtro === "Disponibles" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFiltro("Disponibles")}
          >
            Disponibles
          </button>
          <button
            className={`btn me-2 ${
              filtro === "En viaje" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFiltro("En viaje")}
          >
            En viaje
          </button>
        </div>
        <button
          className="btn btn-success ms-auto"
          onClick={() => navigate("/choferes/nuevoChofer")}
        >
          Nuevo Chofer
        </button>
      </div>

      <ul className="list-group">
        {choferesFiltrados.map((chofer) => (
          <li
            key={chofer.id}
            className="list-group-item"
            onClick={() => toggleSeleccion(chofer.id)}
            style={{ cursor: "pointer" }}
          >
            <strong>
              {chofer.nombre} {chofer.apellido}
            </strong>
            {choferSeleccionado === chofer.id && (
              <div className="mt-2 text-muted">
                <p>
                  <strong>Documento:</strong> {chofer.ci}
                </p>
                <p>
                  <strong>Telefono:</strong> {chofer.telefono}
                </p>
                <p>
                  <strong>Vencimiento de libreta: </strong>
                  {chofer.fechaLibreta}
                </p>
                <p>
                  <strong>Vehículo asignado:</strong>{" "}
                  {chofer.vehiculo || "Ninguno"}
                </p>
                <p>
                  <strong>Estado:</strong> {chofer.estado}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Choferes;
