import React, { useState } from "react";
import { useEffect } from "react";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";

function MembersView(props) {
  const [email, setEmail] = useState("");

  function handleSubmit() {}

  function handleChange(event) {
    let { name, value } = event.target;
    setEmail(value);
    console.log(email);
  }

  return (
    <div>
      <TripByIdNav />
      <div className="tripById">
        <h2>Trip Members</h2>
        {props.usersInTrip.map((u) => (
          <div>
            <div>
              Name: {u.fullname} Email: {u.email} Username: {u.username}
            </div>
            <hr />
          </div>
        ))}

        <h4>Add new members</h4>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" required onChange={handleChange} />
          <button>ADD</button>
        </form>
      </div>
    </div>
  );
}

export default MembersView;
