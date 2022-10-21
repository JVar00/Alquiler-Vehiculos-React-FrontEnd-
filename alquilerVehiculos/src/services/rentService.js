import http from "../../http-common";

const getAll = () => {
  return http.get("/alquiler");
};

const get = (id) => {
  return http.get(`/alquiler/${id}`);
};

const create = (data) => {
  return http.post("/alquiler", data);
};

const update = (data) => {
  return http.put(`/alquiler`, data);
};

const remove = (id) => {
  return http.delete(`/alquiler/${id}`);
};

const RentServiceData = {
  getAll,
  get,
  remove,
  create,
  update,
};

export default RentServiceData;
