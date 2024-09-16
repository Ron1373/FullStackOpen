import { useContext, useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import NotificationContext from "./NotificationContext";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Notification from "./Notification";

const LoginForm = () => {
  const [user, userDispatch] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loginDetails", JSON.stringify(user));
      blogService.setToken(user.token);
      navigate("/");
    } catch (error) {
      notificationDispatch({ type: "ERROR", payload: "Wrong credentials." });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    }
  };

  return (
    <div>
      <Notification />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            data-testid="username"
          />
        </div>

        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            data-testid="password"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
