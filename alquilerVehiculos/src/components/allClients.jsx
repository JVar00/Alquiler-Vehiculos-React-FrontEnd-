//devuelve una tabla
//debe permitir eliminar
//el editar se hace en el portal
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { ClientContext } from "../providers/clientProvider";

const AllClients = () => {
  const { deleteData, clients } = useContext(ClientContext);
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
        Error al intentar eliminar el usuario.
      </p>

      {clients[0] ? (
        clients.map((client) => (
          <div className="col-sm-6 mt-3">
            <Card>
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>{client.identificacion}</Card.Title>
                <Card.Text>{client.nombre}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(client.id)}
                >
                  Eliminar
                </Button>
                <Link to={`/perfil/${client.id}`}>
                  <Button variant="primary">Editar</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p className="text-danger">No se encontraron usuarios</p>
      )}
    </div>
  );
};
export default AllClients;
