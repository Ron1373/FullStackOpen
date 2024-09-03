import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(asObject(action.payload));
    },
    increaseVote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload);
      anecdote.votes += 1;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export default anecdotesSlice.reducer;
export const { increaseVote, createAnecdote, appendAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
