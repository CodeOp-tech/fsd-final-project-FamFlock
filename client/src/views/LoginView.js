import React, { useState } from "react";

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
    // props.login(username, password);
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input name="username" value={username} onChange={handleChange} />
        <label>Password:</label>
        <input name="password" value={password} onChange={handleChange} />
        <button>LOGIN</button>
      </form>
    </div>
  );
}

export default LoginView;
