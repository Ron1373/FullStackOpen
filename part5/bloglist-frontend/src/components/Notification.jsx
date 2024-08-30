const Notification = ({ errorMessage, notificationMessage }) => (
  <>
    <p className="error-msg">{errorMessage}</p>
    <p className="notification-msg">{notificationMessage}</p>
  </>
);

export default Notification;
