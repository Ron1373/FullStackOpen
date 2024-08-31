import PropTypes from "prop-types";

const Notification = ({ errorMessage, notificationMessage }) => (
  <>
    <p className="error-msg">{errorMessage}</p>
    <p className="notification-msg">{notificationMessage}</p>
  </>
);

Notification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  notificationMessage: PropTypes.string.isRequired,
};
export default Notification;
