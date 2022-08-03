import React, { useState } from "react";
import YelpAddToItineraryForm from "./YelpAddToItineraryForm";

function YelpPopUpAddItinerary({ open, onClose, addToItinerary, selected }) {
  if (!open) return null;
  else {
    return (
      <div className="overlay">
        <div className="modalContainer">
          <div className="modalRight">
            <div className="content"></div>
            {/* working on making this more efficient so you can customize */}
            {/* <AddTripForm addTrip={(trip) => addTrip(trip)} /> */}
            <YelpAddToItineraryForm
              selected={selected}
              addToItinerary={addToItinerary}
            />
          </div>
          <div className="btnContainer d-block">
            {/* Close PopUp */}
            <button onClick={onClose} className="btn btn-primary">
              <span className="bold">CANCEL</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default YelpPopUpAddItinerary;
