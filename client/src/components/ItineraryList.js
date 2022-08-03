import React, { useState, useContext } from "react";
import { useDrop } from "react-dnd";
import ItineraryCard from "./ItineraryCard";
import "./ItineraryList.css";
import TripsContext from "../context/TripsContext.js";

function ItineraryList(props) {
  // define empty form
  const EMPTY_FORM = {
    activity: "",
    //   date is column date
    date: props.date,
    location: "",
    time: "",
  };
  const { trip, editItineraryActivity } = useContext(TripsContext);
  const [formData, setFormData] = useState(EMPTY_FORM);

  let itinerary = props.itinerary;

  function handleChange(event) {
    let { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    console.log(formData);
    event.preventDefault();
    // set the trip to the trip saved in state
    formData.FK_trips_id = trip.id;
    props.addToItineraryCb(formData);
    setFormData(EMPTY_FORM);
  }

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

  const [collected, dropRef] = useDrop(() => ({
    accept: "box",

    // this is called when a box is dropped (between columns)
    drop(item, monitor) {
      // pass up the box prop and column id
      props.dropCb(item, props.id);

      // set item date to props.date
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),

    // A box can't be dropped on the column where the drag started!
    canDrop(item, monitor) {
      let box = document.getElementById(item.id);
      let col = document.getElementById(props.id);

      return box.parentElement !== col;
    },
  }));

  // set background color if box is being dragged over a different column
  let canDropClass = collected.isOver && collected.canDrop ? "can-drop" : "";
  return (
    <div
      id={props.id}
      key={props.id}
      ref={dropRef}
      className={`itinerary-list-wrapper ${canDropClass}`}
    >
      {/* i think that this as well as sample card could be potentially editable with a similar thing as edit profile
      except onclick would apply to the whole element instead of a button */}
      <h2>{convertDbDateToHuman(props.date)}</h2>
      {itinerary
        // //   filter to only show certain dates in certain columns
        // .filter((itinerary) => itinerary.date === props.date)
        // // sort by time, ascending
        // .sort((a, b) => a.time.localeCompare(b.time))
        // create a card for each item
        .map((itinerary) => (
          <ItineraryCard
            id={itinerary.localeDate}
            key={itinerary.activityid}
            itinerary={itinerary}
          >
            <strong>{itinerary.time.slice(0, 5)}</strong> <br />{" "}
            {itinerary.activity} at {itinerary.location}
          </ItineraryCard>
        ))}
      <form onSubmit={handleSubmit}>
        <input
          className="itinerary-card-activity"
          id="activity"
          name="activity"
          value={formData.activity}
          type="text"
          onChange={handleChange}
          placeholder="Your activity"
        />
        <input
          className="itinerary-card-location"
          id="location"
          name="location"
          value={formData.location}
          type="text"
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          className="itinerary-card-date"
          id="date"
          name="date"
          //   it would be trip.date but for the specific column
          value={formData.date}
          type="date"
          onChange={handleChange}
        />
        <input
          className="itinerary-card-time"
          id="time"
          name="time"
          value={formData.time}
          type="time"
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Add new activity!
        </button>
      </form>
    </div>
  );
}

export default ItineraryList;
