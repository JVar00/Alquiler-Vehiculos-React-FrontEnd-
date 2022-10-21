import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import { useNavigate, useParams } from "react-router-dom";
import { RentContext } from "../../providers/rentProvider";

const ManageRent = () => {
  const navigate = useNavigate();

  const { id_Alquiler } = useParams();
  const { updateData, getOne, rent } = useContext(RentContext);

  //
  const [date, onChange] = useState(new Date());

  //
  const [notFound, setNotFound] = useState(true);
  const [nice, setNice] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  //agregar use effect que lo busque
  const search = async () => {
    try {
      await getOne(id_Alquiler);
      setNotFound(false);
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

    try {
      await updateData({
        id_Alquiler: id_Alquiler,
        persona: { id_Persona: rent.persona.id_Persona },
        vehiculo: { id_Vehiculo: rent.vehiculo.id_Vehiculo },
        fecha: date,
      });
      setNice(true);
    } catch {
      setErr(true);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return notFound ? (
    <p className="mt-3 text-danger">No se encontro la renta</p>
  ) : (
    <div className="mt-5">
      <h1 className="mb-3">Editar Renta</h1>
      <Container>
        <Container>
          <Form onSubmit={update}>
            <Form.Group className="mb-3" controlId="Auto">
              <Form.Label>Cambiar de Fecha</Form.Label>
              <Calendar minDate={new Date()} onChange={onChange} value={date} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Container>
      </Container>
      <p className={nice ? "text-primary mt-3" : "d-none"}>Renta actualizada</p>
      <p className={err ? "text-danger mt-3" : "d-none"}>
        Ya se ha alquilado un vehiculo en esta fecha
      </p>
      <Button
        variant="danger"
        className="mt-5"
        onClick={() => navigate("/alquiler")}
      >
        Regresar
      </Button>
    </div>
  );
};
export default ManageRent;
