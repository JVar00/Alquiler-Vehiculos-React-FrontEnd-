import { Container } from "react-bootstrap";
import AllClients from "../allClients";
import AddClient from "../user/addClient";

const Portal = () => {
  return (
    <div>
      <Container>
        <div className="mt-5">
          <h5>No tienes un usuario aun?</h5>
          <AddClient />
        </div>
      </Container>

      <hr className="my-4" />
      <hr className="border-bottom border-dark" />

      <h5 className="m-2"> Todos los usuarios </h5>

      <AllClients />
    </div>
  );
};
export default Portal;
