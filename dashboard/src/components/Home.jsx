import { Card } from "react-bootstrap";

function Home() {
  const viajesActivos = [
    {
      id: 1,
      destino: "Montevideo-Melo",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
    },
    {
      id: 2,
      destino: "Montevideo-Colonia",
      chofer: "Juan Perez",
      fechaEntrada: "2025-10-01",
    },
  ];

  const remolquesLibres = [
    { id: 1, matricula: "ATP4008", tipo: "Araña 40", estado: "Disponible" },
    { id: 2, matricula: "ATP4009", tipo: "Araña 40", estado: "Disponible" },
    { id: 3, matricula: "ATP4010", tipo: "Camara", estado: "Disponible" },
    { id: 4, matricula: "ATP4011", tipo: "Araña 20", estado: "Disponible" },
  ];

  const camionesTaller = [
    {
      id: 1,
      matricula: "ACD1234",
      modelo: "Internacional 430",
      motivo: "Cambio aceite",
    },
    {
      id: 2,
      matricula: "BCD5678",
      modelo: "VW Constellation 19.320",
      motivo: "Reparación",
    },
    {
      id: 3,
      matricula: "CDE9101",
      modelo: "Internacional 350",
      motivo: "Revisión sucta",
    },
  ];

  const consumoCamiones = [
    { id: 1, matricula: "ACD1234", promedio: "2.8 km/l" },
    { id: 2, matricula: "BCD5678", promedio: "3.1 km/l" },
    { id: 3, matricula: "CDE9101", promedio: "2.5 km/l" },
    { id: 4, matricula: "DEF2345", promedio: "3.0 km/l" },
    { id: 5, matricula: "EFG3456", promedio: "2.9 km/l" },
  ];

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Resumen General</h2>

      <div className="row g-4 p-3">
        <div className="col-12 col-md-6 col-lg-6">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🚛 Viajes Activos</Card.Title>
              <Card.Text>
                <span className="text-bold">
                  Cantidad de viajes actualmente en curso: <strong>12</strong>
                </span>
                <ul className="list-group list-group-flush">
                  {viajesActivos.map((viaje) => (
                    <li key={viaje.id} className="list-group-item">
                      {viaje.destino} - Chofer: {viaje.chofer} - Fecha de
                      Entrada: {viaje.fechaEntrada}
                    </li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-6">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🛻 Remolques Libres</Card.Title>
              <Card.Text>
                <span>
                  Total disponibles: <strong>8</strong>
                </span>
                <ul className="list-group list-group-flush">
                  {remolquesLibres.map((remolque) => (
                    <li key={remolque.id} className="list-group-item">
                      {remolque.matricula} - {remolque.tipo} - Estado:{" "}
                      {remolque.estado}
                    </li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-6">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>⛽ Consumo de Combustible</Card.Title>
              <Card.Text>
                <span>
                  Promedio mensual: <strong>2.300 L</strong>
                </span>
                <ul className="list-group list-group-flush">
                  {consumoCamiones.map((camion) => (
                    <li key={camion.id} className="list-group-item">
                      {camion.matricula} - Promedio: {camion.promedio}
                    </li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-6">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🔧 Unidades en Taller</Card.Title>
              <ul className="list-group list-group-flush">
                {camionesTaller.map((camionesTaller) => (
                  <li key={camionesTaller.id} className="list-group-item">
                    {camionesTaller.matricula} — {camionesTaller.motivo}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
