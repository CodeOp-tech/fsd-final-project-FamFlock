import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function LoginView(props) {
  const [username, setUsername] = useState(""); // useState 1
  const [password, setPassword] = useState(""); // useState 2

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.loginCb(username, password);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="usernameInput"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="passwordInput"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          LOGIN
        </button>
      </form>
      <nav>
        <Link to="/register">Don't have an account yet? Register here</Link>
      </nav>
    </div>
  );
}

export default LoginView;
