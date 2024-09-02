import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    switch (filter) {
      case "":
        return anecdotes;
      default:
        return anecdotes.filter((anecdote) =>
          anecdote.content.includes(filter)
        );
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(increaseVote(id));
  };

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;