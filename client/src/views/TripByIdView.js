import React, { useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";

function TripByIdView() {
  return (
    <div>
      <h2>Basic info</h2>
      <h2>Members</h2>
      <h2>Chat</h2>
      <nav>
        <Link to={"/chat"}> View the chat here</Link>
      </nav>
      <h2>Itinerary</h2>
      <h2>Lists</h2>
      <h2>Map</h2>
    </div>
  );
}

export default TripByIdView;
