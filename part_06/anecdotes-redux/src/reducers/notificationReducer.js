const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

let timeoutID = undefined;

export const setNotification = (notification, sec) => {
  return (dispatch) => {
    if (timeoutID !== undefined) {
      clearTimeout(timeoutID);
      timeoutID = undefined;
    }

    dispatch({
      type: "SET_NOTIFICATION",
      notification
    });
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    },
      sec * 1_000);
  };
};

const removeNotification = () => ({
  type: "REMOVE_NOTIFICATION"
});

export default notificationReducer;