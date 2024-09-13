import { useState, useEffect, useContext } from "react";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";

import NotificationContext from "./components/NotificationContext";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const handleAddBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token);
      await blogService.create(newBlog);
      notificationDispatch({
        type: "ADD_BLOG",
        payload: { title: newBlog.title, author: newBlog.author },
      });
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
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

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
    }
  }, [user]);

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
          <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
