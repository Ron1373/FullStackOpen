import { useState, useEffect, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";

import NotificationContext from "./components/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const [user, setUser] = useState(null);
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
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

  useEffect(() => {
    const loginDetails = window.localStorage.getItem("loginDetails");
    if (loginDetails) {
      setUser(JSON.parse(loginDetails));
      blogService.setToken(JSON.parse(loginDetails).token);
    }
  }, []);

  return (
    <div>
      <Notification notificationMessage={notification} />
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} logged in</p>

          <button
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem("loginDetails");
            }}
          >
            Log out
          </button>
          <Togglable showButtonLabel="Create New Blog" hideButtonLabel="cancel">
            <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
          {isLoading ? (
            <p>Loading blogs...</p>
          ) : (
            <BlogList blogs={blogs} user={user} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
