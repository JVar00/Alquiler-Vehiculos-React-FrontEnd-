import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { TypeContext } from "../providers/typeProvider";

const AllTypes = () => {
  const { deleteData, types, getAll } = useContext(TypeContext);
  const [error, setError] = useState(false);

  const deleteHandler = async (id) => {
    try {
      await deleteData(id, setError);
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="row">
      <p className={error ? "text-danger" : "d-none"}>
        Error, no se puede eliminar, el elemento posee varias relaciones.
      </p>

      {types[0] ? (
        types.map((type) => (
          <div className="col-sm-3 mt-3" key={type.id_Tipo_Vehiculo}>
            <Card>
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                <Card.Text>Tipo: {type.descripcion}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(type.id_Tipo_Vehiculo)}
                >
                  Eliminar
                </Button>
                <Link to={`gestionarTipo/${type.id_Tipo_Vehiculo}`}>
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
