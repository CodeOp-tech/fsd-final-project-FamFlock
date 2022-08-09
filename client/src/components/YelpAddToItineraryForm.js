import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Components.css";
import TripsContext from "../context/TripsContext.js";

let emptyForm = {
  activity: "",
  date: "",
  location: "",
  time: "",
  FK_trips_id: null,
};
const YelpAddToItineraryForm = ({ selected }) => {
  const [activity, setActivity] = useState(emptyForm);
  const { trip, tripAddresses, addToItinerary, goToItineraryView } =
    useContext(TripsContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setActivity((state) => ({
      ...state,
      [name]: value,
    }));

    console.log(activity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let itineraryActivity = {
      ...activity,
      FK_trips_id: trip.id,
      activity: selected.name,
      location: selected.location.address1,
    };
    addToItinerary(itineraryActivity);
    goToItineraryView(trip.id);
  };

  return (
    <div className="">
      <div className="">
        <form className="form-control-yelp" onSubmit={handleSubmit}>
          <div className="mb-3 form-control-yelp">
            <h4>You are adding to your itinerary:</h4>
            <br />
            <h6>{selected.name}</h6>
            <h6>Located in:{" " + selected.location.address1}</h6>
          </div>
          <div className="mb-3 form-control-yelp">
            <h4>When would you like to go?</h4>
            <div className="row">
              <div className="col"></div>
              <input
                className="col form-control p2"
                type="date"
                name="date"
                min={trip.startDate.substring(0, 10)}
                max={trip.endDate.substring(0, 10)}
                onChange={handleChange}
              />
              <input
                className="col form-control p-2"
                type="time"
                name="time"
                onChange={handleChange}
              />
              <div className="col"></div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary shadow">
            Add To Itinerary
          </button>
        </form>
      </div>
    </div>
  );
};

export default YelpAddToItineraryForm;
