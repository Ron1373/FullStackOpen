import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then((response) => response.data);
};
const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const update = (id, newContact) => {
  return axios
    .put(`${baseURL}/${id}`, newContact)
    .then((response) => response.data);
};
export default { getAll, create, remove, update };
