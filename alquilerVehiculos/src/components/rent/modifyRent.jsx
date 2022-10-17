import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../../providers/carProvider";
import { RentContext } from "../../providers/rentProvider";

const ManageRent = () => {
  const navigate = useNavigate();

  const { uID } = useParams();
  const { updateData, rent, getOne } = useContext(RentContext);
  const { cars } = useContext(CarContext);

  //
  const [date, onChange] = useState(new Date());
  const [placa, setPlaca] = useState("");

  //
  const [notFound, setNotFound] = useState(true);
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [errCar, setErrCar] = useState(false);
  const [errDate, setErrDate] = useState(false);

  const validate = () => {
    if (placa === "" || date === new Date()) {
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

  //agregar use effect que lo busque
  const search = async () => {
    try {
      await getOne(uID);
      setNotFound(false);
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const update = async (e) => {
    e.preventDefault();

    //resets
    setNice(false);
    setErr(false);
    setInput(false);
    setErrCar(false);
    setErrDate(false);

    if (validate()) {
      if (validateCar()) {
        if (validateFecha()) {
          try {
            await updateData({ id: { uID }, auto: { placa }, fecha });
            setNice(true);
          } catch {
            setErr(true);
          }
        }
      }
    }
  };

  return notFound ? (
    <p className="mt-3 text-danger">No se encontro la renta</p>
  ) : (
    <div className="mt-5">
      <Container className="row">
        <Container className="col-sm-4">
          <Form onSubmit={update}>
            <Form.Group className="mb-3" controlId="Auto">
              <Form.Label>Auto</Form.Label>

              <Form.Select
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                aria-label="Auto"
                id="Auto"
              >
                <option value={rent.auto.placa}>
                  Auto actual: {rent.auto.placa}
                </option>
                {/* mapeo de los datos */}

                {cars.map((car) => (
                  <option value={car.placa}>{car.placa}</option>
                ))}
              </Form.Select>
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

      <p className={nice ? "text-primary mt-3" : "d-none"}>Renta actualizada</p>

      <p className={err ? "text-danger mt-3" : "d-none"}>Error en el backend</p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>

      <p className={errCar ? "text-danger mt-3" : "d-none"}>
        Este auto ya esta alquilado
      </p>

      <p className={errDate ? "text-danger mt-3" : "d-none"}>
        Ya se ha alquilado un vehiculo en esta fecha
      </p>
      <Button variant="danger" onClick={() => navigate("/alquiler")}>
        Regresar
      </Button>
    </div>
  );
};
export default ManageRent;
