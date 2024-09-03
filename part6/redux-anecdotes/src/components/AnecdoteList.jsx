import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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

  const vote = (id, content) => {
    dispatch(increaseVote(id));
    dispatch(setNotification(`You voted '${content}'`, 5));
  };

  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>
            vote
          </button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
