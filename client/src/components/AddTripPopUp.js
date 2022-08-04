import React from "react";
import AddTripForm from "./AddTripForm.js";

const AddTripPopUp = ({ addTrip, open, onClose, setOpenPopUpCb }) => {
  if (!open) return null;
  else {
    return (
      <div className="overlay">
        <div className="modalContainer">
          <div className="modalRight">
            {/* working on making this more efficient so you can customize */}
            <AddTripForm
              addTrip={(trip) => addTrip(trip)}
              setOpenPopUpCb={setOpenPopUpCb}
            />
          </div>
          <div>
            {/* Close PopUp */}
            <button onClick={onClose} className="btn btn-primary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default AddTripPopUp;
