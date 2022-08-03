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
    <div className="container ">
      <h2>Login</h2>
      <form
        className="form-control  form-row align-items-center"
        onSubmit={handleSubmit}
      >
        <label>
          <input
            placeholder="username"
            className="form-control "
            type="text"
            name="usernameInput"
            value={username}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <div>
          <label>
            <input
              placeholder="password"
              className="form-control "
              type="password"
              name="passwordInput"
              value={password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button className="btn btn-primary" type="submit">LOGIN</button>
        </div>
      </form>
      <nav>
        <Link to="/register">Don't have an account yet? Register here</Link>
      </nav>
    </div>
  );
}

export default LoginView;
