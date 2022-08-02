import React, { useState, useContext } from "react";

import TripList from "../components/TripList";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import MapsView from "./MapsView";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";

function TripByIdView(props) {
  const { trip, goToMapsView, goToItineraryView, getTrip, fetchItineraries } =
    useContext(TripsContext);

  return (
    <div>
      <h2>Basic info</h2>
      <h2>Members</h2>
      <h2>Chat</h2>
      <nav>{/* <Link to={"/chat"}> View the chat here</Link> */}</nav>
      <h2>Itinerary</h2>
      <p onClick={() => goToItineraryView(trip.id)}>
        Take a look at your itinerary!
      </p>
      <h2>Lists</h2>
      <Link to={"/lists"}>Use your lists to get ready</Link>
      <h2>Map</h2>
      <button onClick={() => goToMapsView(trip.id)}>Go to Maps</button>
    </div>
  );
}

export default TripByIdView;
