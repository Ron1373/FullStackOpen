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

  useEffect(() => {
    const loginDetailsJson = window.localStorage.getItem("loginDetails");
    if (loginDetailsJson) {
      setUser(JSON.parse(loginDetailsJson));
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
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
            <BlogForm
              setErrorMessage={setErrorMessage}
              setNotificationMessage={setNotificationMessage}
              user={user}
              setBlogs={setBlogs}
            />
          </Togglable>
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
