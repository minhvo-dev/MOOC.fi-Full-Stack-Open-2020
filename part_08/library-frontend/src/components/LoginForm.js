import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import { GET_USER, LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  const [getUser, userResult] = useLazyQuery(GET_USER);

  useEffect(() => {
    if (result.data && !userResult.data) {
      const token = result.data.login.value;
      setToken(token);
      sessionStorage.setItem("user-token", token);
      getUser();
    }
    if (userResult.data) {
      setUser(userResult.data.me);
      setPage("authors");
    }
  }, [result.data, userResult.data]); // eslint-disable-line

  const onSubmit = async (event) => {
    event.preventDefault();

    await login({
      variables: {
        username,
        password
      }
    });

    setUsername("");
    setPassword("");
  };

  const onChange = (handler) => {
    return (event) => {
      handler(event.target.value);
    };
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username <input
            value={username}
            onChange={onChange(setUsername)}
          />
        </div>
        <div>
          password <input
            type="password"
            value={password}
            onChange={onChange(setPassword)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;