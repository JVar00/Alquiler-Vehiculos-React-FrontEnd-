import { useContext } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <Carousel className="d-none d-sm-inline">
        <Carousel.Item onClick={() => navigate("alquiler")}>
          <img
            className="d-block w-100"
            src="../src/assets/alquila.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Alquila tu vehiculo soñado</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={() => navigate("catalogo")}>
          <img
            className="d-block w-100"
            src="../src/assets/catalogo.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Nuestro Catalogo</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={() => navigate("perfil")}>
          <img
            className="d-block w-100"
            src="../src/assets/garaje.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Tus alquileres activos</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <hr className="border-bottom border-dark" />
      <hr className="my-4" />
      <Container fluid>
        <div className="row container">
          <h1 className="col text-blue mt-2">Bienvenido a Rent A Car!,</h1>
          <Container className="row my-5">
            <h2 className="text-right">Viaja donde quieras</h2>
            <h2>Cuando quieras</h2>
            <h2>Con ese auto de ensueño</h2>
          </Container>
        </div>

        <hr className="my-4 " />
        <hr className="border-bottom border-dark" />
      </Container>
    </>
  );
};
export default Main;
