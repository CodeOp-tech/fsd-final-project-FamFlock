import React, { useState } from "react";
import YelpAddToItineraryForm from "./YelpAddToItineraryForm";

function YelpPopUpAddItinerary({ open, onClose, addToItinerary, selected }) {
  if (!open) return null;
  else {
    return (
      <div className="">
        <div className="overlay ">
          <div className="modalContainer">
            <div className="modalRight">
              <YelpAddToItineraryForm
                selected={selected}
                addToItinerary={addToItinerary}
              />
            </div>
            <div className="">
              <button onClick={onClose} className="btn btn-primary shadow">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YelpPopUpAddItinerary;
