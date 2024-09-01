import { useState, useEffect } from "react";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token);
      await blogService.create(newBlog);
      setNotificationMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} was added.`
      );
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
      setTimeout(() => {
        setNotificationMessage("");
      }, 5000);
    } catch {
      setErrorMessage("Unable to create new blog");
      setTimeout(() => {
        setErrorMessage("");
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
      <Notification
        errorMessage={errorMessage}
        notificationMessage={notificationMessage}
      />
      {user === null ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
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
