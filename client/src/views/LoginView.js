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
    props.login(username, password);
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          name="username"
          value={username}
          type="text"
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          name="password"
          value={password}
          type="text"
          onChange={handleChange}
        />
        <button>LOGIN</button>
      </form>
      <nav>
        <Link to="/register">Don't have an account yet? Register here</Link>
      </nav>
    </div>
  );
}

export default LoginView;
