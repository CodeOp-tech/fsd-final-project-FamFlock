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

  // Courtesy of Jim!
  //    converts sql date to human
  function convertDbDateToHuman(dbDateTime) {
    // Create a date obj
    let dateObj = new Date(dbDateTime);

    // Convert it to a (long) human readable format
    let humanReadable = dateObj.toString(); // 'Fri Jul 08 2022 00:00:00 GMT+0200'

    // I only want to keep the date part of it
    let humanDate = humanReadable.substring(4, 15); // 'Jul 08 2022'

    return humanDate;
  }

  return (
    <div className="form-control-yelp  form-row align-items-center">
      <form
        className="form-control-yelp  form-row align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 form-control-yelp">
          You are adding to your itinerary:
          <br />
          <h2>{selected.name}</h2>
          <br />
          <h3>Located in:{" " + selected.location.address1}</h3>
        </div>
        <br />
        <div className="mb-3 form-control-yelp">
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
        <br />
        <button type="submit" className="btn btn-primary form-control-yelp">
          Add To Itinerary
        </button>
      </form>
    </div>
  );
};

export default YelpAddToItineraryForm;
