import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

//componentes
import ManageCars from "./components/car/manageCars";
import ManageTypes from "./components/car/manageTypes";
import Catalogue from "./components/mainUI/catalogue";
import Main from "./components/mainUI/main";
import Portal from "./components/mainUI/portal";
import Rent from "./components/mainUI/rentUI";
import ManageRent from "./components/rent/modifyRent";
import ManageUser from "./components/user/modifyClient";
import NavBarMain from "./layouts/nav";
import { ClientProvider } from "./providers/clientProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBarMain />}>
            <Route index element={<Main />} />
            <Route path="alquiler" element={<Rent />}>
              <Route path="alquiler/editar" element={<ManageRent />} />
            </Route>
            <Route path="catalogo" element={<Catalogue />}>
              <Route path="catalogo/gestionarAutos" element={<ManageCars />} />
              <Route path="catalogo/gestionarTipos" element={<ManageTypes />} />
            </Route>
            <Route path="perfil" element={<Portal />}>
              <Route path="perfil/editar" element={<ManageUser />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
