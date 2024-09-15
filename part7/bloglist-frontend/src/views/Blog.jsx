import blogService from "../services/blogs";
import { useContext } from "react";
import NotificationContext from "../components/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

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
    <button
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
    </button>
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
      <button
        onClick={async () => {
          likeBlogMutation.mutate(blog);
        }}
      >
        like
      </button>
      <br />
      Added by {blog.user.name}
      {blog.user.name === user.name && removeBlog()}
      <br />
    </div>
  );
};
export default Blog;
