import { createContext, useState } from "react";
import RentServiceData from "../services/rentService";

export const RentContext = createContext();

export const RentProvider = ({ children }) => {
  const [rents, setRents] = useState([]);
  const [rentID, setRentID] = useState(null);

  //rentas por usuario, modificar
  const getAll = async (id) => {
    const response = await RentServiceData.getAll(id);
    setRents(response.data);
  };

  const getOne = async (id) => {
    const response = await RentServiceData.get(id);
    setRentID(response.data);
    return response;
  };

  const deleteData = async (id) => {
    await RentServiceData.remove(id);
    getAllPersonas();
  };

  const storeData = async (data) => {
    await RentServiceData.create(data);
  };

  return (
    <RentContext.Provider
      value={{
        rents,
        rentID,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAll,
      }}
    >
      {children}
    </RentContext.Provider>
  );
};
