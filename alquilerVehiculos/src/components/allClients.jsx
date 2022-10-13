//devuelve una tabla
//debe permitir eliminar
//el editar se hace en el portal
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const AllClients = () => {
  return (
    <div>
      <Card>
        {/* <Card.Header>Featured</Card.Header> */}
        <Card.Body>
          <Card.Title>Identificacion</Card.Title>
          <Card.Text>Nombre completo.</Card.Text>
          <Button variant="danger">Eliminar</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default AllClients;
