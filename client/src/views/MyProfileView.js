import React, { useState } from "react";

function MyProfileView(props) {
  return (
    <div>
      <h2>My Profile</h2>
      <img src={props.user.picture} />
      <br />
      {props.user.fullname}
      <br />
      {props.user.email}
      <br />
      {props.user.username}
    </div>
  );
}

export default MyProfileView;
