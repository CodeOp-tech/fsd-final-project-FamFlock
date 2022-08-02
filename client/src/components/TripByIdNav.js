import React, { useState, useContext } from "react";

import TripList from "./TripList";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import MapsView from "../views/MapsView";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import { useEffect } from "react";
import TripByIdNavCss from "../components/TripByIdNav.css";

function TripByIdView(props) {
  const {
    trip,
    goToMapsView,
    goToItineraryView,
    getTrip,
    fetchItineraries,
    goToChatView,
    goToListView,
    goToMembersView,
    goToYelpView,
  } = useContext(TripsContext);

  return (
    <div>
      <ul className="verticalNav">
        <li className="vertNavLi">Basic info</li>
        <li className="vertNavLi" onClick={(e) => goToMembersView(trip.id)}>
          Members
        </li>
        <li className="vertNavLi" onClick={(e) => goToChatView(trip.id)}>
          Chat
        </li>
        <li className="vertNavLi" onClick={(e) => goToItineraryView(trip.id)}>
          Itinerary
        </li>
        <li className="vertNavLi" onClick={(e) => goToListView(trip.id)}>
          Lists
        </li>
        <li className="vertNavLi" onClick={(e) => goToYelpView(trip.id)}>
          Yelp Search
        </li>
        <li className="vertNavLi" onClick={() => goToMapsView(trip.id)}>
          Map
        </li>
      </ul>
    </div>
  );
}

export default TripByIdView;
