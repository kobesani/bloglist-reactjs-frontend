import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ loginUser }) => {
  LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

const ShowUser = ({ username, logoutHandler }) => {
  ShowUser.propTypes = {
    username: PropTypes.string.isRequired,
    logoutHandler: PropTypes.func.isRequired
  };

  return (
    <div>
      <p>{username} is logged in</p>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default { LoginForm, ShowUser };
