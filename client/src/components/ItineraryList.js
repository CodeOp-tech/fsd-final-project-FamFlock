import React from "react";
import ItineraryCard from "./ItineraryCard";

function ItineraryList() {
  return (
    <div className="itinerary-list-wrapper col">
      {/* i think that this as well as sample card could be potentially editable with a similar thing as edit profile
      except onclick would apply to the whole element instead of a button */}
      <h2>Date</h2>
      <ItineraryCard />
    </div>
  );
}

export default ItineraryList;
