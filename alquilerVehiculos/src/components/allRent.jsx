//devuelve una tabla
//debe permitir eliminar
//el editar se hace en el portal
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import { RentContext } from "../providers/rentProvider";

const AllRent = () => {
  const { deleteData, rents, getAll } = useContext(RentContext);
  const [error, setError] = useState(false);

  const deleteHandler = async (id) => {
    try {
      await deleteData(id);
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

      {rents[0] ? (
        rents.map((rent) => (
          <div className="col-sm-6 mt-3" key={rent.id_Alquiler}>
            <Card>
              {/* <Card.Header>Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>ID: {rent.id_Alquiler}</Card.Title>
                <Card.Text>Lo alquilo: {rent.persona?.nombre}</Card.Text>
                <Card.Text>Vehiculo de placa: {rent.vehiculo?.placa}</Card.Text>
                <Card.Text>Para el: {rent.fecha}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(rent.id_Alquiler)}
                >
                  Eliminar
                </Button>
                <Link to={`${rent.id_Alquiler}`}>
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
