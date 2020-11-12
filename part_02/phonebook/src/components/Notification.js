import React from "react";

const Notification = ({ notification }) => {
  if (notification === undefined) {
    return null
  }

  return (
    <div className={notification.styleClass}>{notification.message}</div>
  )
}

export default Notification;