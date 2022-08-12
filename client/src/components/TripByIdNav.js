import React, { useState, useContext } from "react";

import TripsContext from "../context/TripsContext";
import TripByIdNavCss from "../components/TripByIdNav.css";

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
      <div>
        <ul className="verticalNav">
          <li className="vertNavLi" onClick={(e) => goToMembersView(trip.id)}>
            Trip Overview
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
