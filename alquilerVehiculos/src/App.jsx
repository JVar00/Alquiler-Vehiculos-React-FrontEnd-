import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

//componentes
import ManageCars from "./components/car/manageCars";
//import ManageTypes from "./components/car/manageTypes";
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
    <ClientProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBarMain />}>
              <Route index element={<Main />} />
              <Route path="alquiler" element={<Rent />} />
              <Route path="alquiler/editar/:id" element={<ManageRent />} />
              <Route path="catalogo" element={<Catalogue />}></Route>
              <Route path="catalogo/gestionarAutos" element={<ManageCars />} />
              {/* <Route path="catalogo/gestionarAuto/:id" element={<ManageCars />} /> */}
              <Route path="perfil" element={<Portal />}>
                <Route path="perfil/editar/:id" element={<ManageUser />} />
              </Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ClientProvider>
  );
}

export default App;
