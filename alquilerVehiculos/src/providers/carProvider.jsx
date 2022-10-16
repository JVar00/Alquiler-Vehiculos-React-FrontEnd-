import { createContext, useState } from "react";
import CarServiceData from "../services/carService";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);

  const getAll = async () => {
    const response = await CarServiceData.getAll();
    setCars(response.data);
  };

  const getOne = async (id) => {
    const response = await CarServiceData.get(id);
    setCar(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await CarServiceData.remove(id);
    getAllPersonas();
    return response;
  };

  const updateData = async (data) => {
    return await CarServiceData.update(data);
  };

  const storeData = async (data) => {
    return await CarServiceData.create(data);
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        car,
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
