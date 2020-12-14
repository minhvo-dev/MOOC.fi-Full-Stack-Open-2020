import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import { useField } from "../hooks";

import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      username.onReset();
      password.onReset();

      dispatch(setUser(user));
      dispatch(setNotification({
        message: `${user.name} logged in`,
        style: "success"
      }));
    }
    catch (error) {
      console.log(error);
      dispatch(setNotification({
        message: "invalid username or password",
        style: "error"
      }));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control {...username} />
          <Form.Label>password:</Form.Label>
          <Form.Control {...password} />
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
