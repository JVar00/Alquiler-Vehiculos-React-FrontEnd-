import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { CarContext } from "../providers/carProvider";

const AllCars = () => {
  const { deleteData, cars } = useContext(CarContext);
  const [error, setError] = useState(false);

  const deleteHandler = (id) => {
    try {
      deleteData(id);
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="row">
      <p className={error ? "text-danger" : "d-none"}>
        Error al intentar eliminar el auto.
      </p>

      {cars[0] ? (
        cars.map((car) => (
          <div className="col-sm-6 mt-3">
            <Card>
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>{car.type}</Card.Title>
                <Card.Text>{car.placa}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(client.id)}
                >
                  Eliminar
                </Button>
                <Link to={`catalogo/gestionarAuto/${car.id}`}>
                  <Button variant="primary">Editar</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p className="text-danger">No se encontraron autos</p>
      )}
    </div>
  );
};
export default AllCars;
