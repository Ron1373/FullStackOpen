import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Button,
  TextField,
} from "@mui/material";

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
        <TextField
          size="small"
          placeholder="Enter new comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button color="success" variant="contained" type="submit">
          Add Comment
        </Button>
      </form>
      {comments.length ? (
        <TableContainer>
          <Table>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment}>
                  <TableCell>{comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No comments yet.</p>
      )}
    </>
  );
};

export default Comments;
