import { Container } from "react-bootstrap";
import AllCars from "../allCars";
import AllTypes from "../allTypes";
import AddCar from "../car/addCar";
import AddType from "../car/addType";

const Catalogue = () => {
  return (
    <div>
      <div className="row">
        <Container className="col-sm-6">
          <div className="mt-5">
            <h5>Agregar un tipo de auto</h5>
            <AddType />
          </div>
        </Container>

        <Container className="col-sm-6">
          <div className="mt-5 ">
            <h5>Agregar un nuevo auto</h5>
            <AddCar />
          </div>
        </Container>
      </div>

      <hr className="my-4" />
      <hr className="border-bottom border-dark" />

      <h5 className="m-2"> Todos los tipos</h5>

      <AllTypes />

      <hr className="my-4" />
      <hr className="border-bottom border-dark" />

      <h5 className="m-2"> Todos los autos</h5>

      <AllCars />
    </div>
  );
};
export default Catalogue;
