import React, { useState } from "react";

function RegisterView(props) {
  const emptyForm = {
    email: "",
    username: "",
    password: "",
    fullname: "",
    picture: "",
  };

  const [formData, setFormData] = useState(emptyForm); // useState 1

  function handleChange(event) {
    let { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.registerCb(
      formData.email,
      formData.username,
      formData.password,
      formData.fullname,
      formData.picture
    );
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            name="email"
            value={formData.email}
            type="text"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            name="username"
            value={formData.username}
            type="text"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            value={formData.password}
            type="password"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Full Name:
          <input
            name="fullname"
            value={formData.fullname}
            type="text"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Profile Picture:
          <input
            name="picture"
            value={formData.picture}
            type="text"
            onChange={handleChange}
          />
        </label>
        <br />
        <button>REGISTER</button>
      </form>
    </div>
  );
}

export default RegisterView;
