import React, { useState } from "react";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";

function MembersView() {
  return (
    <div>
      <TripByIdNav />
      <div className="tripById">
        <h2>Trip Members</h2>
      </div>
    </div>
  );
}

export default MembersView;
