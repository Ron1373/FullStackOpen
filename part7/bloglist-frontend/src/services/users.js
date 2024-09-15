import axios from "axios";

const baseUrl = "http://localhost:3000/api/users";

const getAll = async () => {
  const users = await axios.get(baseUrl);
  return users.data;
};

export default { getAll };
