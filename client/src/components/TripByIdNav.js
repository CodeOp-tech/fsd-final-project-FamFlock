import React, { useState, useContext } from "react";

import TripList from "./TripList";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import MapsView from "../views/MapsView";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import { useEffect } from "react";
import TripByIdNavCss from "../components/TripByIdNav.css";
import TripByIdPopUp from "./TripByIdPopUp";

function TripByIdNav(props) {
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
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {/* <div>
        <button
          className="modalBtn btn btn-primary"
          onClick={() => setVisible(true)}
        >
          Do you need help?
        </button>
      </div>
      {visible ? (
        <div className="overlay">
          <div className="modalContainer">
            <div className="modalRight">
              <TripByIdPopUp
                visible={visible}
                onClose={() => setVisible(false)}
              />
            </div>
          </div>
        </div>
      ) : null} */}
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
    </div>
  );
}

export default TripByIdNav;
