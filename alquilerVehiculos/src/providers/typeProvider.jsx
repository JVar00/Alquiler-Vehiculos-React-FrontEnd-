import { createContext, useState } from "react";
import TypeServiceData from "../services/carService";

export const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState([]);
  const [typeID, setTypeID] = useState(null);

  const getAll = async () => {
    const response = await TypeServiceData.getAll();
    setTypes(response.data);
  };

  const getOne = async (id) => {
    const response = await TypeServiceData.get(id);
    setTypeID(response.data);
    return response;
  };

  const deleteData = async (id) => {
    await TypeServiceData.remove(id);
    getAll();
  };

  const updateData = async (data) => {
    await TypeServiceData.update(data);
  };

  const storeData = async (data) => {
    await TypeServiceData.create(data);
  };

  return (
    <TypeContext.Provider
      value={{
        types,
        typeID,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAll,
      }}
    >
      {children}
    </TypeContext.Provider>
  );
};
