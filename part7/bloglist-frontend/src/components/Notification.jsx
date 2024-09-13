import PropTypes from "prop-types";

const Notification = ({ notificationMessage }) => (
  <>
    <p className="notification-msg">{notificationMessage}</p>
  </>
);

Notification.propTypes = {
  notificationMessage: PropTypes.string.isRequired,
};
export default Notification;
