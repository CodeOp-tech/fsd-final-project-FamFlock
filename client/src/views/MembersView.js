import React, { useState } from "react";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";

function MembersView() {
  return (
    <div>
      <TripByIdNav />
      <div className="tripById">
        <h2>Trip Members</h2>
        <div>
          <div>Name:</div>
          <div>Email:</div>
          <div>Username:</div>
        </div>

        <h4>Add new members</h4>
        <form>
          <label>Email</label>
          <input />
          <button>ADD</button>
        </form>
      </div>
    </div>
  );
}

export default MembersView;
