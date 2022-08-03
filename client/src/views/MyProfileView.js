import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import MyProfileCss from "./MyProfileView.css";

function MyProfileView(props) {
  const [buttonClick, setButtonClick] = useState(false); // useState 1
  const { user, editUser } = useContext(UserContext);

  let { id } = useParams();

  const form = {
    picture: "",
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    currentPassword: "",
    newPassword: "",
  };

  const [formData, setFormData] = useState(form); // useState 2

  function handleClick(event) {
    event.preventDefault();
    setButtonClick(!buttonClick);
  }

  function handleSubmit(event) {
    event.preventDefault();
    editUser(
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
          <img className="propfilePic" src={user.picture} />
          <br />
          <form onSubmit={handleSubmit}>
            <label>Change Profile Picture</label>
            <input
              accept="image/*"
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
            <button className="btn btn-primary" type="submit">
              SAVE
            </button>
          </form>
        </div>
      ) : (
        <div>
          <img className="propfilePic" src={user.picture} />
          <br />
          {user.fullname}
          <br />
          {user.email}
          <br />
          {user.username}
          <br />
          <button className="btn btn-primary" onClick={handleClick}>
            EDIT
          </button>
        </div>
      )}
    </div>
  );
}

export default MyProfileView;
