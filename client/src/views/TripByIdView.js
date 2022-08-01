import React, { useState, useContext } from "react";

import TripList from "../components/TripList";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import MapsView from "./MapsView";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import { useEffect } from "react";

function TripByIdView(props) {
  const { trip, goToMapsView, getTrip, fetchItineraries } =
    useContext(TripsContext);

  // function handleItineraryClick(e) {
  //   getTrip(trip.id);
  //   Navigate(`/itineraries/`);
  // }
  useEffect(() => {
    if (trip) {
      console.log(trip.FK_tripGroups_id);
      props.setGroupIdCb(trip.FK_tripGroups_id);
    }
  }, []);

  return (
    <div>
      <h2>Basic info</h2>
      <h2>Members</h2>
      <h2>Chat</h2>
      <nav>
        <Link to={`/chat/${props.groupId}`}> View the chat here</Link>
      </nav>
      <h2>Itinerary</h2>
      <Link to={"/itinerary"}>Take a look at your itinerary!</Link>
      <h2>Lists</h2>
      <Link to={"/lists"}>Use your lists to get ready</Link>
      <h2>Map</h2>
      <button onClick={() => goToMapsView(trip.id)}>Go to Maps</button>
    </div>
  );
}

export default TripByIdView;
