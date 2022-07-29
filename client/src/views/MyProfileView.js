import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

function MyProfileView(props) {
  const [buttonClick, setButtonClick] = useState(false); // useState 1

  let { id } = useParams();

  const form = {
    picture: "",
    fullname: props.user.fullname,
    email: props.user.email,
    username: props.user.username,
    currentPassword: "",
    newPassword: "",
  };

  const [formData, setFormData] = useState(form); // useState 2

  function handleClick(event) {
    event.preventDefault();
    setButtonClick(!buttonClick);
  }

  function handleChangeImage(event) {
    const file = event.target.files[0];
    console.log(file);
    if (file.size > 100000) {
      console.log("image is too large");
    } else {
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.editUserCb(
      formData.picture,
      formData.fullname,
      formData.email,
      formData.username,
      formData.currentPassword,
      formData.newPassword,
      id
    );
    setButtonClick(!buttonClick);
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
              type="file"
              accept="image/*"
              value={formData.picture}
              name="picture"
              onChange={handleChangeImage}
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
            <h5>Change Password</h5>
            <label>Current password</label>
            <input
              value={formData.currentPassword}
              name="currentPassword"
              onChange={handleChange}
            />
            <br />
            <label>New password</label>
            <input
              value={formData.newPassword}
              name="newPassword"
              onChange={handleChange}
            />
            <br />
            <button type="submit">SAVE</button>
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
