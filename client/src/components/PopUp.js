import React from "react";

const PopUp = ({ open, onClose }) => {
  if (!open) return null;
  else {
    return (
      <div onClick={onClose} className="overlay">
        <div className="modalContainer">
          <div className="modalRight">
            <div className="content"></div>
            <p>FORM</p>
            <p>content</p>
          </div>
          <div className="btnContainer">
            <button className="btnPrimary">
              <span className="bold">SAVE</span>
            </button>
            <button onClick={onClose} className="btnDutLine">
              <span className="bold">CANCEL</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default PopUp;
