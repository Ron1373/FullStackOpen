import { Alert } from "@mui/material";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const severity = notification.isSuccessful ? "success" : "error";
  return notification ? (
    <Alert severity={severity}>{notification.message}</Alert>
  ) : null;
};

export default Notification;
