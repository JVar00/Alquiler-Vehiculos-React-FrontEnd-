import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { CarContext } from "../providers/carProvider";

const AllCars = () => {
  const { deleteData, cars, getAllCars } = useContext(CarContext);
  const [error, setError] = useState(false);

  const deleteHandler = (id) => {
    try {
      deleteData(id);
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <div className="row">
      <p className={error ? "text-danger" : "d-none"}>
        Error al intentar eliminar el auto.
      </p>

      {cars[0] ? (
        cars.map((car) => (
          <div className="col-sm-6 mt-3" key={car.placa}>
            <Card>
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>Tipo: {car.tipo_Vehiculo?.descripcion}</Card.Title>
                <Card.Text>Placa: {car.placa}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(car.id_Vehiculo)}
                >
                  Eliminar
                </Button>
                <Link to={`gestionarAuto/${car.id_Vehiculo}`}>
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
