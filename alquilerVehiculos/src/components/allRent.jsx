//devuelve una tabla
//debe permitir eliminar
//el editar se hace en el portal
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { RentContext } from "../providers/rentProvider";

const AllRent = () => {
  const { deleteData, rents } = useContext(RentContext);
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
        Error al intentar eliminar la renta.
      </p>

      {rents[0] ? (
        rents.map((rent) => (
          <div className="col-sm-6 mt-3">
            <Card>
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>{rent.persona.identificacion}</Card.Title>
                <Card.Text>{rent.auto.placa}</Card.Text>
                <Button variant="danger" onClick={() => deleteHandler(rent.id)}>
                  Eliminar
                </Button>
                <Link to={`alquiler/${rent.id}`}>
                  <Button variant="primary">Editar</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p className="text-danger">No se encontraron rentas</p>
      )}
    </div>
  );
};
export default AllRent;
