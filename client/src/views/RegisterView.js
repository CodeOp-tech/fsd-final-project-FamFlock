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
    // props.register(
    //   formData.email,
    //   formData.username,
    //   formData.password,
    //   formData.fullname
    //   formData.picture,
    // );
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          name="email"
          value={formData.email}
          type="text"
          onChange={handleChange}
        />
        <br />
        <label>Username:</label>
        <input
          name="username"
          value={formData.username}
          type="text"
          onChange={handleChange}
        />
        <br />
        <label>Password:</label>
        <input
          name="password"
          value={formData.password}
          type="text"
          onChange={handleChange}
        />
        <br />
        <label>Full Name:</label>
        <input
          name="fullname"
          value={formData.fullname}
          type="text"
          onChange={handleChange}
        />
        <br />
        <label>Profile Picture:</label>
        <input
          name="picture"
          value={formData.picture}
          type="text"
          onChange={handleChange}
        />
        <br />
        <button>REGISTER</button>
      </form>
    </div>
  );
}

export default RegisterView;
