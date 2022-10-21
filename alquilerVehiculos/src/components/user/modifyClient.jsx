import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ClientContext } from "../../providers/clientProvider";

const ManageUser = () => {
  const navigate = useNavigate();

  const { id_Persona } = useParams();
  const { updateData, client, getOne } = useContext(ClientContext);

  const [notFound, setNotFound] = useState(true);
  const [nice, setNice] = useState(false);
  const [errDB, setErrDB] = useState(false);
  const [input, setInput] = useState(false);
  const [loading, setLoading] = useState(false);

  //
  const [id, setID] = useState("");
  const [nombre, setNombre] = useState("");

  const validate = () => {
    if (id === "" || nombre === "") {
      return false;
    }
    return true;
  };

  const cargarDatos = () => {
    setID(client.identificacion);
    setNombre(client.nombre);
  };

  const update = async (e) => {
    e.preventDefault();

    setNice(false);
    setErrDB(false);
    setInput(false);

    if (validate()) {
      try {
        setLoading(true);
        await updateData({
          id_Persona: id_Persona,
          identificacion: id,
          nombre: nombre,
        });
        setNice(true);
      } catch {
        setErrDB(true);
      }
    } else {
      setInput(true);
    }
  };

  //agregar use effect que lo busque
  const search = async () => {
    try {
      await getOne(id_Persona);
      console.log(id_Persona);
      setNotFound(false);
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    search();
    setLoading(false);
  }, []);

  if (loading) return <div>Cargando...</div>;

  //if err true haga
  return notFound ? (
    <p className="mt-3 text-danger">No se encontro el usuario ingresado</p>
  ) : (
    <>
      <h5>Bienvenido de vuelta {client.nombre} </h5>

      <Button variant="primary" onClick={cargarDatos}>
        Cargar Datos
      </Button>

      <Form onSubmit={update}>
        <Form.Group className="mb-3" controlId="myForm">
          <Form.Label>Identificacion</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(e) => setID(e.target.value)}
            placeholder="Ingrese su identificacion"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={() => setNombre(e.target.value)}
            placeholder="Ingrese Nombre completo"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>

      <p className={nice ? "text-primary mt-3" : "d-none"}>
        El usuario se actualizo con exito
      </p>

      <p className={errDB ? "text-danger mt-3" : "d-none"}>
        La identificacion debe ser unica
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>

      <Button variant="danger" onClick={() => navigate("/perfil")}>
        Regresar
      </Button>
    </>
  );
};
export default ManageUser;
