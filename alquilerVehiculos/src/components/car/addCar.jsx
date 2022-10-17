import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CarContext } from "../../providers/carProvider";
import { TypeContext } from "../../providers/typeProvider";

const AddCar = () => {
  const { storeData } = useContext(CarContext);
  const { types } = useContext(TypeContext);
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");

  const validate = () => {
    if (placa === "" || tipo === "") {
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
        await storeData({ placa: placa, tipo: { tipo } });
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
          <Form.Label>Placa</Form.Label>
          <Form.Control
            onChange={(e) => setPlaca(e.target.value)}
            value={placa}
            type="text"
            placeholder="Ingrese la placa del auto"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Tipo-Auto">
          <Form.Label>Tipo de auto</Form.Label>
          {types[0] ? (
            <Form.Select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              aria-label="Tipo-Auto"
              id="Tipo-Auto"
            >
              <option value="">Seleccione un tipo de auto</option>
              {/* mapeo de los datos */}

              {types.map((type) => (
                <option value={type.descripcion}>{type.descripcion}</option>
              ))}
            </Form.Select>
          ) : (
            <p className="text-danger">No hay tipos de autos</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>

      <p className={nice ? "text-primary mt-3" : "d-none"}>
        El auto se ingreso con exito
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        La placa debe ser unica
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>
    </>
  );
};
export default AddCar;
