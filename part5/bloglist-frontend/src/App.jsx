import { useState, useEffect } from "react";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loginDetails", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      blogService.create(newBlog);
      setNotificationMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} was added.`
      );
      setTimeout(() => {
        setNotificationMessage("");
      }, 5000);
      setNewBlog({ title: "", author: "", url: "" });
    } catch {
      setErrorMessage("Unable to create new blog");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  useEffect(() => {
    const loginDetailsJson = window.localStorage.getItem("loginDetails");
    if (loginDetailsJson) {
      setUser(JSON.parse(loginDetailsJson));
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  });

  return (
    <div>
      <Notification
        errorMessage={errorMessage}
        notificationMessage={notificationMessage}
      />
      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
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
          <Togglable>
            <BlogForm
              newBlog={newBlog}
              setNewBlog={setNewBlog}
              handleAddBlog={handleAddBlog}
            />
          </Togglable>
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
