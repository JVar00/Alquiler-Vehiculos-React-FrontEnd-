import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Outlet, useNavigate } from "react-router-dom";
import { ClientContext } from "../../providers/clientProvider";
import AllClients from "../allClients";
import AddClient from "../user/addClient";
import ModifyClient from "../user/modifyClient";

const Portal = () => {
  const navigate = useNavigate();
  const { getOne } = useContext(ClientContext);
  const [logged, setLogged] = useState(false);
  const [id, setID] = useState("");
  const [err, setErr] = useState(false);

  const search = async () => {
    setLogged(false);

    try {
      await getOne(id);
      setLogged(true);
    } catch {
      setErr(true);
      setLogged(false);
    }
  };

  return (
    <div>
      <Container className="d-flex row justify-content-start m-3">
        <div className="row">
          <h5>Buscar mi usuario</h5>
          <input
            type="text"
            placeholder="Identificacion"
            className="mt-2 w-50"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
        </div>

        <Button className="w-25 mt-3" onClick={search}>
          Buscar
        </Button>

        <p className={err ? "mt-3 text-danger" : "d-none"}>
          No se encontro el usuario ingresado
        </p>
      </Container>

      <Container>
        {logged ? (
          navigate("/perfil:id")
        ) : (
          <div className="mt-5">
            <h5>No tienes un usuario aun?</h5>
            <AddClient />
          </div>
        )}
      </Container>

      <hr className="my-4" />
      <hr className="border-bottom border-dark" />

      <h5 className="m-4"> Todos los usuarios </h5>

      <AllClients />
    </div>
  );
};
export default Portal;
