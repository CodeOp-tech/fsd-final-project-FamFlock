import React from "react";

function ItineraryCard() {
  function handleChange(event) {
    let { name, value } = event.target;
    // this needs more stuff
  }
  return (
    <div className="itinerary-list-card">
      {/* javascript insert time, activity, and location */}
      <p>Time: Activity at Location</p>

      <input
        className="itinerary-card-input"
        type="text"
        onChange={handleChange}
        placeholder="Add something..."
      />
    </div>
  );
}

export default ItineraryCard;
