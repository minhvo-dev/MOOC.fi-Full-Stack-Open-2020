import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button } from "react-bootstrap";
const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onClick = () => {
    dispatch(removeUser());
    dispatch(setNotification({
      message: `${user.name} logged out`,
      style: "success"
    }));
  };

  return (
    <span>
      <span>{user.name} logged in</span> <Button onClick={onClick}>logout</Button>
    </span>
  );
};

export default Logout;