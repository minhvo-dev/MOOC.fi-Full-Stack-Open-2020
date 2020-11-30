import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  username,
  password,
  usernameOnChange,
  passwordOnChange,
  onSubmit
}) => {

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={usernameOnChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={passwordOnChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  usernameOnChange: PropTypes.func.isRequired,
  passwordOnChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

LoginForm.displayName = "LoginForm";

export default LoginForm;
