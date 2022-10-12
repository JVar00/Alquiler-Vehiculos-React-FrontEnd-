import { createContext, useState } from "react";
import CarServiceData from "../services/carService";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [carID, setCarID] = useState(null);

  const getAll = async () => {
    const response = await CarServiceData.getAll();
    setCars(response.data);
  };

  const getOne = async (id) => {
    const response = await CarServiceData.get(id);
    setCarID(response.data);
    return response;
  };

  const deleteData = async (id) => {
    await CarServiceData.remove(id);
    getAllPersonas();
  };

  const updateData = async (data) => {
    await CarServiceData.update(data);
  };

  const storeData = async (data) => {
    await CarServiceData.create(data);
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        carID,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAll,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
