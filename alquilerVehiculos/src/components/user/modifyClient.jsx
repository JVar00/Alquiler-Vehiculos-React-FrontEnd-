import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../providers/clientProvider";

const ManageUser = () => {
  const { uID } = useParams();
  const { updateData, client } = useContext(ClientContext);

  const update = (e) => {
    e.preventDefault();
    console.log("editando");
  };

  //agregar use effect que lo busque
  const search = async () => {
    try {
      await getOne(uID);
      setErr(false);
    } catch {
      setErr(true);
    }
  };

  useEffect(() => {
    search();
  }, []);

  //if err true haga
  return err ? (
    <p className={err ? "mt-3 text-danger" : "d-none"}>
      No se encontro el usuario ingresado
    </p>
  ) : (
    <>
      <h5>Bienvenido de vuelta {client.name} </h5>
      <Form onSubmit={update}>
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
    </>
  );
};
export default ManageUser;
