import config from "../configs/config";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data
    case "REMOVE_USER":
      return null;
    case "INIT_USER":
      return action.data;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return (dispatch) => {
    window.localStorage.setItem(config.LOGGED_USER_CREDENTIALS_NAME, JSON.stringify(user));
    dispatch({
      type: "SET_USER",
      data: user
    });
  };
};

export const removeUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem(config.LOGGED_USER_CREDENTIALS_NAME);
    dispatch({
      type: "REMOVE_USER"
    });
  };
};

export const initializeUser = () => {
  return (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem(config.LOGGED_USER_CREDENTIALS_NAME));
    dispatch({
      type: "INIT_USER",
      data: user
    });
  }
}

export default reducer;