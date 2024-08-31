import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

const loginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div>
      <h2>Log in to application</h2>
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

export default loginForm;
