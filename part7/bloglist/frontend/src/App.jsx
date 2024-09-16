import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import UserContext from "./components/UserContext";
import NotificationContext from "./components/NotificationContext";

import Users from "./views/Users";
import Home from "./views/Home";

import blogService from "./services/blogs";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import User from "./views/User";
import Blog from "./views/Blog";
import Navbar from "./components/Navbar";

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
  }, []);

  if (user) {
    return (
      <>
        <Notification notificationMessage={notification} />
        <Navbar user={user} userDispatch={userDispatch} />
        <Routes>
          <Route
            path="/users/:id"
            element={user ? <User /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/blogs/:id"
            element={
              user ? <Blog user={user} /> : <Navigate replace to="/login" />
            }
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
