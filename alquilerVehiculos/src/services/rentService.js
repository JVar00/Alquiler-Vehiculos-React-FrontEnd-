import http from "../../http-common";

const getAll = () => {
  return http.get("/.");
};

const get = (id) => {
  return http.get(`/./${id}`);
};

const create = (data) => {
  return http.post("/.", data);
};

const update = (data) => {
  return http.put(`/.`, data);
};

const remove = (id) => {
  return http.delete(`/./${id}`);
};

const RentServiceData = {
  getAll,
  get,
  remove,
  create,
  update,
};

export default RentServiceData;