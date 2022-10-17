import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ClientContext } from "../../providers/clientProvider";

const AddClient = () => {
  const { storeData } = useContext(ClientContext);
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [id, setID] = useState("");
  const [nombre, setNombre] = useState("");

  const validate = () => {
    if (id === "" || nombre === "") {
      return false;
    }
    return true;
  };

  const create = async (e) => {
    setNice(false);
    setErr(false);
    setInput(false);
    e.preventDefault();
    if (validate()) {
      try {
        await storeData({ identificacion: id, nombre: nombre });
        setNice(true);
      } catch {
        setErr(true);
      }
    } else {
      setInput(true);
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
      <p className={nice ? "text-primary mt-3" : "d-none"}>
        El usuario se ingreso con exito
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        La identificacion debe ser unica
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>
    </>
  );
};
export default AddClient;
