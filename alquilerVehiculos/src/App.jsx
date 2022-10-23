import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

//componentes
import ManageCar from "./components/car/manageCar";
import ManageCarType from "./components/car/manageCarType";
import Catalogue from "./components/mainUI/catalogue";
import Logs from "./components/mainUI/logs";
import Main from "./components/mainUI/main";
import Portal from "./components/mainUI/portal";
import Rent from "./components/mainUI/rentUI";
import ManageRent from "./components/rent/modifyRent";
import ManageUser from "./components/user/modifyClient";
import NavBarMain from "./layouts/nav";
import { CarProvider } from "./providers/carProvider";
import { ClientProvider } from "./providers/clientProvider";
import { RentProvider } from "./providers/rentProvider";
import { TypeProvider } from "./providers/typeProvider";

function App() {
  return (
    <ClientProvider>
      <TypeProvider>
        <CarProvider>
          <RentProvider>
            <div className="App">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<NavBarMain />}>
                    <Route index element={<Main />} />
                    <Route path="alquiler" element={<Rent />} />
                    <Route
                      path="alquiler/:id_Alquiler"
                      element={<ManageRent />}
                    />
                    <Route path="catalogo" element={<Catalogue />}></Route>
                    <Route
                      path="catalogo/gestionarAuto/:id_Vehiculo"
                      element={<ManageCar />}
                    />
                    <Route
                      path="catalogo/gestionarTipo/:id_Tipo_Vehiculo"
                      element={<ManageCarType />}
                    />
                    {/* <Route path="catalogo/gestionarAuto/:id" element={<ManageCar />} /> */}
                    <Route path="perfil" element={<Portal />}></Route>
                    <Route path="perfil/:id_Persona" element={<ManageUser />} />
                    <Route path="logs" element={<Logs />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </div>
          </RentProvider>
        </CarProvider>
      </TypeProvider>
    </ClientProvider>
  );
}

export default App;
