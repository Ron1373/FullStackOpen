import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import UserContext from "./components/UserContext";
import NotificationContext from "./components/NotificationContext";

import Users from "./views/Users";
import Home from "./views/Home";

import blogService from "./services/blogs";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
  const navigate = useNavigate();
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(UserContext);

  useEffect(() => {
    const loginDetails = window.localStorage.getItem("loginDetails");
    if (loginDetails) {
      userDispatch({ type: "LOGIN", payload: JSON.parse(loginDetails) });
      blogService.setToken(JSON.parse(loginDetails).token);
    } else {
      navigate("/login");
    }
  }, [userDispatch]);

  if (user) {
    return (
      <>
        <Notification notificationMessage={notification} />

        <div>
          <p>{user.name} logged in</p>
          <button
            onClick={() => {
              userDispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("loginDetails");
              navigate("/login");
            }}
          >
            Log out
          </button>
        </div>

        <Routes>
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate replace to="/login" />}
          />
        </Routes>
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<LoginForm />} />
      </Routes>
    );
  }
};

export default App;
