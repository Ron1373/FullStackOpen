import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Comments = ({ blogId, comments }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: (comment) => blogService.addComment(blogId, comment),
    onSuccess: queryClient.invalidateQueries(["blogs"]),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === "") {
      return;
    }
    commentMutation.mutate(comment);
    setComment("");
  };
  return (
    <>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      {comments ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </>
  );
};

export default Comments;
