import http from "../../http-common";

const getAll = () => {
  return http.get("/vehiculo");
};

const get = (id) => {
  return http.get(`/vehiculo/${id}`);
};

const create = (data) => {
  return http.post("/vehiculo", data);
};

const update = (data) => {
  return http.put(`/vehiculo`, data);
};

const remove = (id) => {
  return http.delete(`/vehiculo/${id}`);
};

const CarServiceData = {
  getAll,
  get,
  remove,
  create,
  update,
};

export default CarServiceData;
