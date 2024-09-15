import axios from "axios";
const baseUrl = "http://localhost:3000/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const addLike = async (blog) => {
  const config = { headers: { Authorization: token } };
  const newBlog = {
    likes: blog.likes + 1,
  };
  const putUrl = `${baseUrl}/${blog.id}`;
  const response = await axios.put(putUrl, newBlog, config);
  return response.data;
};

const deletePost = async (blog) => {
  const config = { headers: { Authorization: token } };
  const deleteUrl = `${baseUrl}/${blog.id}`;

  const response = await axios.delete(deleteUrl, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const commentUrl = `${baseUrl}/${id}/comments`;

  const response = await axios.post(commentUrl, { comment });
  return response.data;
};

export default { getAll, setToken, create, addLike, deletePost, addComment };
