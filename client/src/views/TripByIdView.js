import React, { useState, useContext } from "react";

import TripList from "../components/TripList";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import MapsView from "./MapsView";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import { useEffect } from "react";
import TripByIdCss from "./TripByIdView.css";

function TripByIdView(props) {
 
  const { trip, goToMapsView, goToItineraryView, getTrip, fetchItineraries } =
    useContext(TripsContext);

  useEffect(() => {
    if (trip) {
      props.setGroupIdCb(trip.id);
    }
  }, [trip]);

  return (
    <div>

      <ul className="verticalNav">
        <li className="vertNavLi">Basic info</li>
        <li className="vertNavLi">Members</li>
        <li className="vertNavLi">
          <Link to={`/chat/${props.groupId}`}>Chat</Link>
        </li>
        <li className="vertNavLi">
          <Link to={"/itinerary"}>Itinerary</Link>
        </li>
        <li className="vertNavLi">
          <Link to={"/lists"}>Lists</Link>
        </li>
        <li className="vertNavLi">
          Map
          <button onClick={() => goToMapsView(trip.id)}>Go to Maps</button>
        </li>
      </ul>

    </div>
  );
}

export default TripByIdView;
