import React, { useState } from "react";
import AddTripForm from "./AddTripForm.js";

const AddTripPopUp = ({ addTrip, open, onClose }) => {
  if (!open) return null;
  else {
    return (
      <div className="overlay">
        <div className="modalContainer">
          <div className="modalRight">
            <div className="content"></div>
            {/* working on making this more efficient so you can customize */}
            <AddTripForm addTrip={(trip) => addTrip(trip)} />
          </div>
          <div className="btnContainer d-block">
            {/* Add and Save Trip */}
            <button className="btnPrimary">
              <span className="bold">SAVE</span>
            </button>
            {/* Close PopUp */}
            <button onClick={onClose} className="btnDutLine">
              <span className="bold">CANCEL</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default AddTripPopUp;
