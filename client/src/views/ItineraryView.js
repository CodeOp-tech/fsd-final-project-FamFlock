import React from "react";
import ItineraryList from "../components/ItineraryList";

function ItineraryView() {
  return (
    <div>
      <h1>Itinerary for Your Trip 📅 </h1>
      {/* this would technically be window */}
      <ItineraryList />
    </div>
  );
}

export default ItineraryView;
