import React, { useState, useContext } from "react";

import TripList from "../components/TripList";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import MapsView from "./MapsView";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import { useEffect } from "react";
import TripByIdCss from "./TripByIdView.css";

function TripByIdView(props) {
  const {
    trip,
    goToMapsView,
    goToItineraryView,
    getTrip,
    fetchItineraries,
    goToChatView,
  } = useContext(TripsContext);

  return (
    <div>
      <ul className="verticalNav">
        <li className="vertNavLi">Basic info</li>
        <li className="vertNavLi">Members</li>
        <li className="vertNavLi" onClick={(e) => goToChatView(trip.id)}>
          Chat
        </li>
        <li className="vertNavLi" onClick={(e) => goToItineraryView(trip.id)}>
          Itinerary
        </li>
        <li className="vertNavLi">Lists</li>
        <li className="vertNavLi" onClick={() => goToMapsView(trip.id)}>
          Map
        </li>
      </ul>
    </div>
  );
}

export default TripByIdView;
