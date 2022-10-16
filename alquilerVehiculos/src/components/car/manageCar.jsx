import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../../providers/carProvider";
import { TypeContext } from "../../providers/typeProvider";

const ManageCar = () => {
  const navigate = useNavigate();

  const { uID } = useParams();
  const { updateData, car, getOne } = useContext(CarContext);
  const { types } = useContext(TypeContext);

  const [notFound, setNotFound] = useState(true);
  const [nice, setNice] = useState(false);
  const [errDB, setErrDB] = useState(false);
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

  const cargarDatos = () => {
    setPlaca(car.placa);
    setTipo(car.type);
  };

  const update = async (e) => {
    e.preventDefault();

    setNice(false);
    setErrDB(false);
    setInput(false);

    if (validate()) {
      try {
        await updateData({ uID, placa, tipo });
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
    <p className="mt-3 text-danger">No se encontro el auto</p>
  ) : (
    <>
      <h5>Auto de placa {car.placa} </h5>

      <Button variant="secundary" onClick={cargarDatos}>
        Cargar Datos
      </Button>

      <Form onSubmit={update}>
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
        El usuario se actualizo con exito
      </p>

      <p className={errDB ? "text-danger mt-3" : "d-none"}>
        La identificacion debe ser unica
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
export default ManageCar;
