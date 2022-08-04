import React, { useState } from "react";

const TripByIdPopUp = (visible, setVisible, onClose) => {
  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalRight">
          <div onClick={() => setVisible(!visible)}>
            Need Help?
            <div visible={visible} onClose={() => setVisible(false)}>
              <p>Try to visit the sections on the left</p>
            </div>
          </div>
          <div>
            <button onClick={onClose} className="btn btn-primary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TripByIdPopUp;
