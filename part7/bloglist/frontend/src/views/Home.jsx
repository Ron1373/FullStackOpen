import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";

import blogService from "../services/blogs";

import NotificationContext from "../components/NotificationContext";
import UserContext from "../components/UserContext";

const Home = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const [user, userDispatch] = useContext(UserContext);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleAddBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token);
      newBlogMutation.mutate(newBlog);
      notificationDispatch({
        type: "ADD_BLOG",
        payload: { title: newBlog.title, author: newBlog.author },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    } catch {
      notificationDispatch({
        type: "ERROR",
        payload: "Unable to create new blog",
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    }
  };

  return (
    <div>
      <Togglable showButtonLabel="Create New Blog" hideButtonLabel="cancel">
        <BlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      {isLoading ? <p>Loading blogs...</p> : <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
