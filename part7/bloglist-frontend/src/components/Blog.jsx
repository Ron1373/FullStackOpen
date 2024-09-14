import blogService from "../services/blogs";
import { useContext, useState } from "react";
import NotificationContext from "./NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Blog = ({ blog, user }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();

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

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeBlog = () => (
    <button
      onClick={async () => {
        try {
          if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            deleteBlogMutation.mutate(blog);
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

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <div>
        <button
          style={{ display: visible ? "none" : "block" }}
          onClick={toggleVisibility}
        >
          view
        </button>
        <div
          style={{ display: visible ? "" : "none" }}
          className="blog-details"
        >
          {blog.url}
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
          {blog.user.name}
          {blog.user.name === user.name && removeBlog()}
          <button
            style={{ display: visible ? "block" : "none" }}
            onClick={toggleVisibility}
          >
            hide
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};
export default Blog;
