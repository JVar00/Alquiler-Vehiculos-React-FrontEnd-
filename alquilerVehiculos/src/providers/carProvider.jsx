import { createContext, useState } from "react";
import CarServiceData from "../services/carService";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);

  const getAllCars = async () => {
    const response = await CarServiceData.getAll();
    setCars(response.data);
  };

  const getOne = async (id) => {
    const response = await CarServiceData.get(id);
    console.log(response.data);
    setCar(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await CarServiceData.remove(id);
    getAllCars();
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
        getAllCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
