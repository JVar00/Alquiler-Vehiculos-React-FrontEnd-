import { Container } from "react-bootstrap";
import AllRent from "../allRent";
import NewRent from "../rent/newRent";

const Rent = () => {
  return (
    <div>
      <Container>
        <div className="mt-5">
          <h5>Alquila Hoy!</h5>
          <NewRent />
        </div>
      </Container>

      <hr className="my-4" />
      <hr className="border-bottom border-dark" />

      <h5 className="m-2"> Todas las rentas activas </h5>

      <AllRent />
    </div>
  );
};
export default Rent;
