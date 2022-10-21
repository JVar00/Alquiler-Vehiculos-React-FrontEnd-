import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import { useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../../providers/carProvider";
import { RentContext } from "../../providers/rentProvider";

const ManageRent = () => {
  const navigate = useNavigate();

  const { id_Alquiler } = useParams();
  const { updateData, rent, getOne } = useContext(RentContext);
  const { cars, getAllCars } = useContext(CarContext);

  //
  const [date, onChange] = useState(new Date());
  const [idVehiculo, setIDVehiculo] = useState("");

  //
  const [notFound, setNotFound] = useState(true);
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (idVehiculo === "" || date === new Date()) {
      setInput(true);
      return false;
    }
    return true;
  };

  //agregar use effect que lo busque
  const search = async () => {
    try {
      await getOne(id_Alquiler);
      setNotFound(false);
      getAllCars();
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    search();
    setLoading(false);
  }, []);

  const update = async (e) => {
    e.preventDefault();

    //resets
    setNice(false);
    setErr(false);
    setInput(false);

    if (validate()) {
      try {
        await updateData({
          id_Alquiler: id_Alquiler,
          vehiculo: { id_Vehiculo: idVehiculo },
          //fecha,
        });
        setNice(true);
      } catch {
        setErr(true);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  return notFound ? (
    <p className="mt-3 text-danger">No se encontro la renta</p>
  ) : (
    <div className="mt-5">
      <Container className="row">
        <Container className="col-sm-5">
          <Form onSubmit={update}>
            <Form.Group className="mb-3" controlId="Auto">
              <Form.Label>Auto</Form.Label>

              <Form.Select
                value={idVehiculo}
                onChange={(e) => setIDVehiculo(e.target.value)}
                aria-label="Auto"
                id="Auto"
              >
                <option value={rent.vehiculo?.placa}>
                  Auto actual: {rent.vehiculo?.placa}
                </option>
                {/* mapeo de los datos */}

                {cars.map((car) => (
                  <option key={car.id_Vehiculo} value={car.id_Vehiculo}>
                    Auto Placa: {car.placa}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Container>
        <Container className="col-sm-7">
          <Calendar minDate={new Date()} onChange={onChange} value={date} />
        </Container>
      </Container>

      <p className={nice ? "text-primary mt-3" : "d-none"}>Renta actualizada</p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        Ya se ha alquilado un vehiculo en esta fecha o el auto ya ha sido
        alquilado
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>

      <Button variant="danger" onClick={() => navigate("/alquiler")}>
        Regresar
      </Button>
    </div>
  );
};
export default ManageRent;
