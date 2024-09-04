import axios from "axios";

export const getAnecdotes = async () => {
  const result = await axios.get("http://localhost:3001/anecdotes");
  return result.data;
};
