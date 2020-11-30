import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notification}) => {
  if (notification === undefined) {
    return null;
  }

  return (
    <div className={notification.style}>{notification.message}</div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired
};

Notification.displayName = "Notification";

export default Notification;