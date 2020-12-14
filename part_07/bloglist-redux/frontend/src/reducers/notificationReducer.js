import config from "../configs/config";

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

let timeoutID = undefined;

export const setNotification = (notification) => {
  return (dispatch) => {
    if (timeoutID !== undefined) {
      clearTimeout(timeoutID);
      timeoutID = undefined;
    }
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification
    });
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, config.NOTIFICATION_TIMEOUT);
  };
};

const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  };
};

export default notificationReducer;