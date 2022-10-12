import { createContext, useState } from "react";
import ClientServiceData from "../services/clientService";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [clientID, setClientID] = useState(null);

  const getAll = async () => {
    const response = await ClientServiceData.getAll();
    setClients(response.data);
  };

  const getOne = async (id) => {
    const response = await ClientServiceData.get(id);
    setClientID(response.data);
    return response;
  };

  const deleteData = async (id) => {
    await ClientServiceData.remove(id);
    getAllPersonas();
  };

  const updateData = async (data) => {
    await ClientServiceData.update(data);
  };

  const storeData = async (data) => {
    await ClientServiceData.create(data);
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        clientID,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAll,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
