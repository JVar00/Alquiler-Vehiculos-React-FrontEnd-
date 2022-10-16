import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { TypeContext } from "../providers/typeProvider";

const AllTypes = () => {
  const { deleteData, types } = useContext(TypeContext);
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
        Error al intentar eliminar el tipo.
      </p>

      {types[0] ? (
        types.map((type) => (
          <div className="col-sm-3 mt-3">
            <Card>
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>{type.type}</Card.Title>
                <Card.Text>{car.placa}</Card.Text>
                <Button variant="danger" onClick={() => deleteHandler(type.id)}>
                  Eliminar
                </Button>
                <Link to={`catalogo/gestionarTipo/${type.id}`}>
                  <Button variant="primary">Editar</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p className="text-danger">No se encontraron tipos de autos</p>
      )}
    </div>
  );
};
export default AllTypes;
