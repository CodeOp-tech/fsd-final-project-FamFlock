import React, { useState, useContext } from "react";
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
  const { trip, tripAddresses, addToItinerary } = useContext(TripsContext);

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
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          You are adding to your itinerary:
          <h2>{selected.name}</h2>
          <h3>Located in:{" " + selected.location.address1}</h3>
        </div>
        <div>
          When would you like to go?
          <input
            type="date"
            name="date"
            min={trip.startDate.substring(0, 10)}
            max={trip.endDate.substring(0, 10)}
            onChange={handleChange}
          />
          <input type="time" name="time" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Add To Itinerary
        </button>
      </form>
    </div>
  );
};

export default YelpAddToItineraryForm;
