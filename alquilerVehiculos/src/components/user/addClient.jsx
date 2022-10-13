import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ClientContext } from "../../providers/clientProvider";

const AddClient = () => {
  const { storeData } = useContext(ClientContext);
  const [nice, setNice] = useState(false);
  const [id, setID] = useState("");
  const [nombre, setNombre] = useState("");

  const create = (e) => {
    e.preventDefault();
    try {
      storeData({ id, nombre });
      setNice(true);
    } catch {
      setNice(false);
    }
  };

  return (
    <>
      <Form onSubmit={create}>
        <Form.Group className="mb-3" controlId="myForm">
          <Form.Label>Identificacion</Form.Label>
          <Form.Control
            onChange={(e) => setID(e.target.value)}
            value={id}
            type="text"
            placeholder="Ingrese su identificacion"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            type="text"
            placeholder="Ingrese Nombre completo"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
      <p className={nice ? "" : "d-none"}>
        No se encontro el usuario ingresado
      </p>
    </>
  );
};
export default AddClient;
