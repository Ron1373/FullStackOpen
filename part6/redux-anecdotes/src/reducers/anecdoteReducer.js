import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
  },
});

export default anecdotesSlice.reducer;
export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdotesSlice.actions;

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const increaseVote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToUpdate = getState().anecdotes.find(
      (anecdote) => anecdote.id === id
    );
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    };
    const savedAnecdote = await anecdoteService.update(id, updatedAnecdote);
    dispatch(updateAnecdote(savedAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
