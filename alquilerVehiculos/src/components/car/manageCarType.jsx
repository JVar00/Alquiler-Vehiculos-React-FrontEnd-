import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TypeContext } from "../../providers/typeProvider";

const ManageCarType = () => {
  const navigate = useNavigate();

  const { uID } = useParams();
  const { updateData, type, getOne } = useContext(TypeContext);

  const [notFound, setNotFound] = useState(true);
  const [nice, setNice] = useState(false);
  const [errDB, setErrDB] = useState(false);
  const [input, setInput] = useState(false);

  //
  const [descripcion, setDescripcion] = useState("");

  const validate = () => {
    if (descripcion === "") {
      return false;
    }
    return true;
  };

  const cargarDatos = () => {
    setDescripcion(type.descripcion);
  };

  const update = async (e) => {
    e.preventDefault();

    setNice(false);
    setErrDB(false);
    setInput(false);

    if (validate()) {
      try {
        await updateData({ id: uID, descripcion: descripcion });
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
      await getOne(uID);
      setNotFound(false);
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return notFound ? (
    <p className="mt-3 text-danger">No se encontro el tipo</p>
  ) : (
    <>
      <h5>ID Tipo {type.id} </h5>

      <Button variant="secundary" onClick={cargarDatos}>
        Cargar Datos Anteriores
      </Button>

      <Form onSubmit={update}>
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
          Editar tipo
        </Button>
      </Form>

      <p className={nice ? "text-primary mt-3" : "d-none"}>
        El tipo se actualizo con exito
      </p>

      <p className={errDB ? "text-danger mt-3" : "d-none"}>
        Esto no debia pasar
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los campos requeridos
      </p>

      <Button variant="danger" onClick={() => navigate("/catalogo")}>
        Regresar
      </Button>
    </>
  );
};
export default ManageCarType;
