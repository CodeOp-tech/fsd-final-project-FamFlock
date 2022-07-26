import React from "react";
import AddTripForm from "./AddTripForm.js";

const AddTripPopUp = ({ open, onClose, onSave }) => {
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
            <button onClick={onSave} className="btnPrimary">
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
