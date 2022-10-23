import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { NavButton } from "./navButton";

const NavBarMain = () => {
  return (
    <>
      <Navbar className="navBg" expand="lg">
        <Container fluid>
          <Navbar.Brand className="w-auto" as={Link} to="/">
            <img
              src="../src/assets/Logo-nobg.png"
              className="img-fluid shadow-4"
              width={150}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="NavBar" />
          <Navbar.Collapse id="NavBar">
            <Nav className="me-auto px-3 justify-content-end w-100">
              <NavButton redirectTo="/alquiler" inputName="Alquila Hoy!" />
              <NavButton redirectTo="/catalogo" inputName="Catalogo" />
              <NavButton redirectTo="/perfil" inputName="Usuarios" />
              <NavButton redirectTo="/logs" inputName="Logs" />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="p-4">
        <Outlet></Outlet>
      </section>
    </>
  );
};
export default NavBarMain;
