import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TypeContext } from "../../providers/typeProvider";

const AddType = () => {
  const { storeData } = useContext(TypeContext);
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //
  const [descripcion, setDescripcion] = useState("");

  const validate = () => {
    if (descripcion === "") {
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
        await storeData({ descripcion });
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
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            onChange={(e) => setDescripcion(e.target.descripcion)}
            value={descripcion}
            type="text"
            placeholder="Ingrese una descripcion"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar tipo
        </Button>
      </Form>

      <p className={nice ? "text-primary mt-3" : "d-none"}>
        El tipo se ingreso con exito
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        Esto no debia pasar, panic
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>
    </>
  );
};
export default AddType;
