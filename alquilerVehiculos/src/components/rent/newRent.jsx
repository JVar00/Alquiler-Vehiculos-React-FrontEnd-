import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import { CarContext } from "../../providers/carProvider";
import { ClientContext } from "../../providers/clientProvider";
import { RentContext } from "../../providers/rentProvider";

const NewRent = () => {
  const { cars, getAllCars } = useContext(CarContext);
  const { storeData, getAll } = useContext(RentContext);
  const { clients, getAllPersonas } = useContext(ClientContext);

  //inputs
  const [date, onChange] = useState(new Date());
  const [idVehiculo, setIDVehiculo] = useState("");
  const [id, setID] = useState("");

  //errores
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  useEffect(() => {
    getAllCars();
    getAllPersonas();
  }, []);

  const validate = () => {
    if (idVehiculo === "" || id === "") {
      setInput(true);
      return false;
    }
    return true;
  };

  const create = async (e) => {
    e.preventDefault();

    //resets
    setNice(false);
    setErr(false);
    setInput(false);

    if (validate()) {
      try {
        await storeData({
          persona: { id_Persona: id },
          vehiculo: { id_Vehiculo: idVehiculo },
          //fecha
        });
        setNice(true);
        getAll();
      } catch {
        setErr(true);
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

              {clients[0] ? (
                <Form.Select
                  onChange={(e) => setID(e.target.value)}
                  value={id}
                  aria-label="Auto"
                  id="Auto"
                >
                  <option value="">Seleccione su nombre</option>
                  {/* mapeo de los datos */}

                  {clients.map((client) => (
                    <option key={client.id_Persona} value={client.id_Persona}>
                      {client.nombre}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <p className="text-danger">No hay autos disponibles</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="Auto">
              <Form.Label>Auto</Form.Label>
              {cars[0] ? (
                <Form.Select
                  value={idVehiculo}
                  onChange={(e) => setIDVehiculo(e.target.value)}
                  aria-label="Auto"
                  id="Auto"
                >
                  <option value="">Seleccione un auto</option>
                  {/* mapeo de los datos */}

                  {cars.map((car) => (
                    <option key={car.id_Vehiculo} value={car.id_Vehiculo}>
                      Placa: {car.placa}
                    </option>
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

      <p className={err ? "text-danger mt-3" : "d-none"}>
        Este auto ya esta alquilado o ya alquilaste en estas fechas
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>
    </div>
  );
};
export default NewRent;
