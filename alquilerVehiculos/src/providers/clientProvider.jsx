import { createContext, useState } from "react";
import ClientServiceData from "../services/clientService";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);

  const getAllPersonas = async () => {
    const response = await ClientServiceData.getAll();
    setClients(response.data);
  };

  const getOne = async (id) => {
    const response = await ClientServiceData.get(id);
    setClient(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await ClientServiceData.remove(id);
    getAllPersonas();
    return response;
  };

  const updateData = async (data) => {
    return await ClientServiceData.update(data);
  };

  const storeData = async (data) => {
    return await ClientServiceData.create(data);
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        client,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAllPersonas,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
