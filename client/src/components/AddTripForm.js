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
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <label className="col-sm-2 col-form-label">Destination</label>
            <input
              className="form-control"
              name="destination"
              value={trip.destination}
              onChange={handleInputChange}
              type="text"
              id="destination"
              placeholder="Your trip destination"
            />
          </div>

          <div className="container">
            <label className="col-sm-2 col-form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={trip.name}
              onChange={handleInputChange}
              type="text"
              id="name"
              placeholder="Give your trip group a name"
            />
          </div>

          <div>
            <label className="col-mb-2 col-form-label">
              Start date
              <input
                className="form-control"
                type="date"
                value={trip.startDate}
                onChange={handleInputChange}
                name="startDate"
              />
            </label>
          </div>
          <div className="container">
            <label className="col-mb-2 col-form-label">
              End date
              <input
                className="form-control"
                type="date"
                value={trip.endDate}
                onChange={handleInputChange}
                name="endDate"
              />
            </label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTripForm;
