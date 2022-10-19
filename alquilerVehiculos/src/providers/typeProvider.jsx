import { createContext, useState } from "react";
import TypeServiceData from "../services/typeService";

export const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);

  const getAll = async () => {
    const response = await TypeServiceData.getAll();
    setTypes(response.data);
  };

  const getOne = async (id) => {
    const response = await TypeServiceData.get(id);
    setType(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await TypeServiceData.remove(id);
    getAll();
    return response;
  };

  const updateData = async (data) => {
    return await TypeServiceData.update(data);
  };

  const storeData = async (data) => {
    return await TypeServiceData.create(data);
  };

  return (
    <TypeContext.Provider
      value={{
        types,
        type,
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
