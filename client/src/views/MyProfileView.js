import React, { useState } from "react";

function MyProfileView(props) {
  return (
    <div>
      <h2>My Profile</h2>
      <img src={props.user.picture} />
      {props.user.fullname}
      {props.user.email}
      {props.user.username}
    </div>
  );
}

export default MyProfileView;
