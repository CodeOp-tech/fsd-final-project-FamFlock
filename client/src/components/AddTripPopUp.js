import React, { useState } from "react";
import AddTripForm from "./AddTripForm.js";

const AddTripPopUp = ({ open, onClose, onSubmit }) => {
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState([]);

  const addTrip = async (newTrip) => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrip),
    };
    try {
      let response = await fetch("/trips", options);
      if (response.ok) {
        let data = await response.json();
        setTrips(data);
      } else {
        console.log(`server error: ${response.statud} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  const handleSaveTrip = (e) => {
    e.preventDefault();
    addTrip(trip);
  };

  if (!open) return null;
  else {
    return (
      <div className="overlay">
        <div className="modalContainer">
          <div className="modalRight">
            <div className="content"></div>
            {/* working on making this more efficient so you can customize */}
            <AddTripForm />
          </div>
          <div className="btnContainer d-block">
            {/* Add and Save Trip */}
            <button onClick={handleSaveTrip} className="btnPrimary">
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
