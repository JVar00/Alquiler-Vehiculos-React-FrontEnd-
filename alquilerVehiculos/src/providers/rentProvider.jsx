import { createContext, useState } from "react";
import RentServiceData from "../services/rentService";

export const RentContext = createContext();

export const RentProvider = ({ children }) => {
  const [rents, setRents] = useState([]);
  const [rent, setRent] = useState(null);

  //rentas por usuario, modificar
  const getAll = async (id) => {
    const response = await RentServiceData.getAll(id);
    setRents(response.data);
  };

  const getOne = async (id) => {
    const response = await RentServiceData.get(id);
    setRent(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await RentServiceData.remove(id);
    getAll();
    return response;
  };

  const storeData = async (data) => {
    return await RentServiceData.create(data);
  };

  const updateData = async (data) => {
    return await RentServiceData.update(data);
  };

  return (
    <RentContext.Provider
      value={{
        rents,
        rent,
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
