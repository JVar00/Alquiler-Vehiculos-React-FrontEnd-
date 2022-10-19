import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import { CarContext } from "../../providers/carProvider";
import { RentContext } from "../../providers/rentProvider";

const NewRent = () => {
  const { cars } = useContext(CarContext);
  const { storeData } = useContext(RentContext);

  //inputs
  const [date, onChange] = useState(new Date());
  const [placa, setPlaca] = useState("");
  const [id, setID] = useState("");

  //errores
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [errCar, setErrCar] = useState(false);
  const [errDate, setErrDate] = useState(false);
  const [errPersona, setErrPersona] = useState(false);

  const validate = () => {
    if (placa === "" || id === "") {
      setInput(true);
      return false;
    }
    return true;
  };

  const validateFecha = () => {
    //en teoria esto debe revisar si la fecha no coincide con una existente para una misma persona
    // if (null) {
    //   return false;
    //   setErrDate(true);
    // }
    return true;
  };

  const validateCar = () => {
    //esto debe validar si el auto no esta rentando aun, nuevo dato para la tabla autos que diga si esta rentado o no
    // if (null) {
    //   return false;
    //   setErrCar(true);
    // }
    return true;
  };

  const validatePersona = () => {
    //esto debe validar si la persona existe en la base de datos
    // if (null) {
    //   return false;
    //   setErrPersona(true);
    // }
    return true;
  };

  const create = async (e) => {
    e.preventDefault();

    //resets
    setNice(false);
    setErr(false);
    setInput(false);
    setErrCar(false);
    setErrDate(false);
    setErrPersona(false);

    if (validate()) {
      if (validatePersona()) {
        if (validateCar()) {
          if (validateFecha()) {
            try {
              await storeData({ persona: { id }, vehiculo: { placa }, fecha });
              setNice(true);
            } catch {
              setErr(true);
            }
          }
        }
      }
    }
  };

  return (
    <div className="mt-5">
      <Container className="row">
        <Container className="col-sm-4">
          <Form onSubmit={create}>
            <Form.Group className="mb-3" controlId="myForm">
              <Form.Label>Identificacion de la persona</Form.Label>
              <Form.Control
                onChange={(e) => setID(e.target.value)}
                value={id}
                type="text"
                placeholder="Ingresela su identificacion"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Auto">
              <Form.Label>Auto</Form.Label>
              {cars[0] ? (
                <Form.Select
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  aria-label="Auto"
                  id="Auto"
                >
                  <option value="">Seleccione un tipo de auto</option>
                  {/* mapeo de los datos */}

                  {cars.map((car) => (
                    <option value={car.placa}>{car.placa}</option>
                  ))}
                </Form.Select>
              ) : (
                <p className="text-danger">No hay autos disponibles</p>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Container>
        <Container className="col-sm-8">
          <Calendar minDate={new Date()} onChange={onChange} value={date} />
        </Container>
      </Container>
      <p className={nice ? "text-primary mt-3" : "d-none"}>
        Gracias por rentar con nosotros
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>Error en el backend</p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>

      <p className={errCar ? "text-danger mt-3" : "d-none"}>
        Este auto ya esta alquilado
      </p>

      <p className={errPersona ? "text-danger mt-3" : "d-none"}>
        Esta persona no existe
      </p>
      <p className={errDate ? "text-danger mt-3" : "d-none"}>
        Ya se ha alquilado un vehiculo en esta fecha
      </p>
    </div>
  );
};
export default NewRent;
