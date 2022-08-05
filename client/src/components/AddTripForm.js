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
    <div className="form-control-addtrip  form-row align-items-center">
      <div className="form-group">
        <form
          onSubmit={handleSubmit}
          className="form-control-addtrip  form-row align-items-center"
        >
          <div className="form-control-addtrip  form-row align-items-center">
            <label className="form-control-addtrip  form-row align-items-center">
              Destination
            </label>
            <input
              className="form-control-addtrip  form-row align-items-center"
              name="destination"
              value={trip.destination}
              onChange={handleInputChange}
              type="text"
              id="destination"
              placeholder="Your trip destination"
            />
          </div>

          <div className="form-control-addtrip  form-row align-items-center">
            <label className="form-control-addtrip  form-row align-items-center">
              Name
            </label>
            <input
              className="form-control-addtrip  form-row align-items-center"
              name="name"
              value={trip.name}
              onChange={handleInputChange}
              type="text"
              id="name"
              placeholder="Give your trip group a name"
            />
          </div>

          <div className="form-control-addtrip  form-row align-items-center">
            <label className="form-control-addtrip  form-row align-items-center">
              Start date
              <input
                className="form-control-addtrip  form-row align-items-center"
                type="date"
                value={trip.startDate}
                onChange={handleInputChange}
                name="startDate"
              />
            </label>
          </div>
          <div className="form-control-addtrip  form-row align-items-center">
            <label className="form-control-addtrip  form-row align-items-center">
              End date
              <input
                className="form-control-addtrip  form-row align-items-center"
                type="date"
                value={trip.endDate}
                onChange={handleInputChange}
                name="endDate"
              />
            </label>
          </div>
          <div className="form-control-addtrip  form-row align-items-center">
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTripForm;
