import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  useEffect(() => {
    const loginDetailsJson = window.localStorage.getItem("loginDetails");
    if (loginDetailsJson) {
      setUser(JSON.parse(loginDetailsJson));
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username"></label>
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              id="username"
              name="username"
            />
          </div>

          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              id="password"
              name="password"
            />

            <button type="submit">login</button>
          </div>
        </form>
      </div>
    );
  };

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  const blogForm = () => (
    <>
      <h2>Create New Blog</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          blogService.setToken(user.token);
          blogService.create(newBlog);
          setNewBlog({ title: "", author: "", url: "" });
        }}
      >
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            value={newBlog.title}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, title: event.target.value }));
            }}
            id="title"
            name="title"
          />
        </div>

        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            value={newBlog.author}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, author: event.target.value }));
            }}
            id="author"
            name="author"
          />
        </div>

        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            value={newBlog.url}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, url: event.target.value }));
            }}
            name="url"
            id="url"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
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
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
