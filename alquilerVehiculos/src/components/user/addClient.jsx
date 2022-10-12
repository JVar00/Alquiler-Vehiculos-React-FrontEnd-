const AddClient = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="myForm">
        <Form.Label>Identificacion</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su identificacion" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese Nombre completo" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Ingresar
      </Button>
    </Form>
  );
};
export default AddClient;
