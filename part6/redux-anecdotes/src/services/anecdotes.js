import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const update = async (id) => {
  const anecdotes = await getAll();
  const anecdote = anecdotes.find((a) => a.id === id);
  const response = await axios.put(`${baseUrl}/${id}`, {
    content: anecdote.content,
    votes: anecdote.votes + 1,
  });
  return response.data;
};

export default { getAll, createNew, update };
