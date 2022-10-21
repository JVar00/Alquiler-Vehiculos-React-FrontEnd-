import http from "../../http-common";

const getAll = () => {
  return http.get("/tipo_vehiculo");
};

const get = (id) => {
  return http.get(`/tipo_vehiculo/${id}`);
};

const create = (data) => {
  return http.post("/tipo_vehiculo", data);
};

const update = (data) => {
  return http.put(`/tipo_vehiculo`, data);
};

const remove = (id) => {
  return http.delete(`/tipo_vehiculo/${id}`);
};

const TypeServiceData = {
  getAll,
  get,
  remove,
  create,
  update,
};

export default TypeServiceData;
