import { Card } from "react-bootstrap";

const data = [
  { matricula: "ABC-123", ultimo: 3.1, mensual: 3.5, historico: 3.8 },
  { matricula: "XYZ-789", ultimo: 2.8, mensual: 3.2, historico: 3.5 },
  { matricula: "LMN-456", ultimo: 2.2, mensual: 2.7, historico: 2.9 },
];

function Consumos() {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Consumos de Combustible</h2>
      <div className="row g-4">
        {data.map((vehiculo, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="text-center">
                  {vehiculo.matricula}
                </Card.Title>
                <div className="mt-3">
                  <p>
                    <strong>Último viaje:</strong>{" "}
                    <span
                      className={
                        vehiculo.ultimo > 3
                          ? "text-success"
                          : vehiculo.ultimo >= 2.5
                          ? "text-warning"
                          : "text-danger"
                      }
                    >
                      {vehiculo.ultimo} km/l
                    </span>
                  </p>
                  <p>
                    <strong>Promedio mensual:</strong> {vehiculo.mensual} km/l
                  </p>
                  <p>
                    <strong>Histórico:</strong> {vehiculo.historico} km/l
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Consumos;
