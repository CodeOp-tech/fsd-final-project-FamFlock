import React, { useState } from "react";
import TripByIdList from "../components/TripByIdList";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import MapsView from "./MapsView";


  return (
    <div>
      <h2>Basic info</h2>
      <h2>Members</h2>
      <h2>Chat</h2>
      <nav>{/* <Link to={"/chat"}> View the chat here</Link> */}</nav>
      <h2>Itinerary</h2>
      <Link to={"/itinerary"}>Take a look at your itinerary!</Link>
      <h2>Lists</h2>
      <Link to={"/lists"}>Use your lists to get ready</Link>
      <h2>Map</h2>
    </div>
  );
}

export default TripByIdView;
