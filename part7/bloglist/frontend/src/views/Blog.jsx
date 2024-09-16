import blogService from "../services/blogs";
import { useContext } from "react";
import NotificationContext from "../components/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { Button } from "@mui/material";

const Blog = ({ user }) => {
  const id = useParams().id;
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: blogService.addLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const removeBlog = () => (
    <Button
      color="error"
      variant="contained"
      size="small"
      onClick={async () => {
        try {
          if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            deleteBlogMutation.mutate(blog);
            navigate("/");
          }
        } catch (error) {
          notificationDispatch({
            type: "ERROR",
            payload: `Error deleting blog: ${error}.`,
          });
        }
      }}
    >
      Remove
    </Button>
  );
  if (isLoading) return <p>Loading blog data...</p>;

  const blog = blogs.find((b) => b.id === id);

  return (
    <div className="blog">
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      Likes: <span data-testid="likes-count">{blog.likes}</span>
      <Button
        color="success"
        variant="contained"
        size="small"
        onClick={async () => {
          likeBlogMutation.mutate(blog);
        }}
      >
        like
      </Button>
      <br />
      Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      <br />
      {blog.user.name === user.name && removeBlog()}
      <br />
      <Comments blogId={blog.id} comments={blog.comments} />
    </div>
  );
};
export default Blog;
