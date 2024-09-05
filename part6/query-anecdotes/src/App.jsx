import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useReducer } from "react";
import NotificationContext from "./NotificationContext";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `anecdote '${action.payload.content}' voted`;
    case "ADD":
      return `anecdote '${action.payload}' created`;
    case "RESET":
      return "";
    default:
      return state;
  }
};
const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: "VOTE", payload: anecdote });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, 5000);
  };

  const { status, data, error } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
  if (status === "pending") {
    return <div>Loading data...</div>;
  }
  if (status === "error") {
    return <div>anecdotes service not available due to problems in server</div>;
  }
  const anecdotes = data;

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </NotificationContext.Provider>
  );
};

export default App;
