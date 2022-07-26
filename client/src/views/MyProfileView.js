import React, { useState } from "react";

function MyProfileView(props) {
  const [buttonClick, setButtonClick] = useState(false); // useState 1

  const form = {
    picture: "",
    fullname: props.user.fullname,
    email: props.user.email,
    username: props.user.username,
    password: "",
  };

  const [formData, setFormData] = useState(form); // useState 2

  function handleClick() {
    setButtonClick(!buttonClick);
  }

  function handleSubmit(event) {
    event.preventDefult();
  }

  function handleChange(event) {
    let { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div>
      <h2>My Profile</h2>
      {buttonClick ? (
        <div>
          <img src={props.user.picture} />
          <br />
          <form onSubmit={handleSubmit}>
            <label>Change Profile Picture</label>
            <input
              value={formData.picture}
              name="picture"
              onChange={handleChange}
            />
            <br />
            <label>Edit name</label>
            <input
              value={formData.fullname}
              name="fullname"
              onChange={handleChange}
            />
            <br />
            <label>Edit email</label>
            <input
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            <br />
            <label>Edit username</label>
            <input
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
            <br />
            <label>Current password</label>
            <input
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
            <br />
            <label>New password</label>
            <input
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
            <br />
            <button onClick={handleClick}>SAVE</button>
          </form>
        </div>
      ) : (
        <div>
          <img src={props.user.picture} />
          <br />
          {props.user.fullname}
          <br />
          {props.user.email}
          <br />
          {props.user.username}
          <br />
          <button onClick={handleClick}>EDIT</button>
        </div>
      )}
    </div>
  );
}

export default MyProfileView;
