import React, { useState, useContext } from "react";
import "./Components.css";
import UserContext from "../context/UserContext";

const EMPTY_FORM = {
  startDate: "",
  endDate: "",
  destination: "",
  name: "",
  user_id: null,
};
const AddTripForm = ({ setOpenPopUpCb }) => {
  const [trip, setTrip] = useState(EMPTY_FORM);

  const { user, addTrip } = useContext(UserContext);

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    setTrip((state) => ({
      ...state,
      [name]: value,
    }));

    console.log(trip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(trip);
    addTrip(trip);
    setTrip(EMPTY_FORM);
    setOpenPopUpCb(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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

        <div className="tripGroup">
          <label htmlFor="groupName" className="groupName-label">
            Give your Group Name
          </label>
          <input
            name="name"
            value={trip.name}
            onChange={handleInputChange}
            type="text"
            id="name"
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
                <div className="accordion-body">Select the date</div>
                <input
                  type="date"
                  value={trip.startDate}
                  onChange={handleInputChange}
                  name="startDate"
                />
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
                <div className="accordion-body">Select the date</div>
                <input
                  type="date"
                  value={trip.endDate}
                  onChange={handleInputChange}
                  name="endDate"
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTripForm;
