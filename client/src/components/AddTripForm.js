import React, { useState } from "react";
import "./Components.css";

const AddTripForm = ({ props }) => {
  const [trip, setTrip] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setTrip((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <form trip={props.trip}>
        <div className="mb-3">
          <label htmlFor="destination" className="destination-label">
            Destination
          </label>
          <input
            name="destination"
            value={trip.destination}
            onChange={handleInputChange}
            type="text"
            id="destination"
          />
        </div>

        <div>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Start-date
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">User will choose date here</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  End-date
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">User will choose date here</div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTripForm;
