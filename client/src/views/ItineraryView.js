import React, { useState, useEffect, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ItineraryList from "../components/ItineraryList";
import Api from "../helpers/Api";
import TripsContext from "../context/TripsContext.js";
import TripByIdNavCss from "../components/TripByIdNav.css";
import TripByIdNav from "../components/TripByIdNav";
import "./ItineraryView.scss";
import "../Common.scss";


function ItineraryView(props) {
  let addToItinerary = props.addToItinerary;
  const {
    trip,
    getTrip,
    editItineraryActivity,
    goToYelpView,
    itineraries,
    fetchItineraries,
  } = useContext(TripsContext);
  const [myItinerary, setMyItinerary] = useState(null); // JBR

  // JBR
  //   if a trip by id exists then set the itinerary, calling the make itinerary function
  useEffect(() => {
    if (trip) {
      setMyItinerary(makeMyItinerary());
    }
  }, [trip]);

  // JBR
  // Convert a UTC date to yyyy-mm-dd in local timezone
  function makeLocaleDate(utcdate) {
    return new Date(utcdate)
    // Set date to German because it shows the first three letters of the month
      .toLocaleDateString("de-DE", { dateStyle: "medium" })
    // reverse the order that they appear
      .replace(/(\d\d)\.(\d\d).(\d{4})/, "$3-$2-$1");
  }

  // JBR
  // Return a "customized" version of the itinerary that's easy to render
  function makeMyItinerary() {
    // Add localeDate (not UTC) to all acts
    let acts = [];
    // for evert activity in itinerary
    for (let act of trip.itinerary) {
      // new activity is........
      let newAct = { ...act };
      // Add a localeDate which is the *correct* date
      newAct.localeDate = makeLocaleDate(newAct.date);
      acts.push(newAct);
    }

    // Sort all acts by date/time
    function compareActs(a, b) {
      if (`${a.localeDate} ${a.time}` < `${b.localeDate} ${b.time}`) {
        return -1;
      }
      if (`${a.localeDate} ${a.time}` > `${b.localeDate} ${b.time}`) {
        return 1;
      }
      return 0;
    }
    acts.sort(compareActs);

    // Create obj with all dates in trip
    // thanks: https://code-boxx.com/date-range-javascript/
    let startDate = new Date(makeLocaleDate(trip.startDate));
    let endDate = new Date(makeLocaleDate(trip.endDate));
    let ustart = startDate.getTime();
    let uend = endDate.getTime();
    let actsByDate = {};
    for (let unix = ustart; unix <= uend; unix += 86400000) {
      let localeDate = new Date(unix).toISOString().substring(0, 10);
      actsByDate[localeDate] = [];
    }

    // Assign activities to appropriate dates
    for (let act of acts) {
      // add each activity based on the date defined in it
      actsByDate[act.localeDate].push(act);
    }

    return actsByDate;
  }

  // JBR
  if (!myItinerary) {
    return <h2>Loading...</h2>;
  }

  // JBR
  let allDates = Object.keys(myItinerary);


//   function called when box is dropped
  function moveBox(item, toColId) {
    //   call the put function to change the date here
    editItineraryActivity(toColId, item.activityid);
  }

  return (
    <div>
      <TripByIdNav />
      <div className="tripById">
        <div className="container">
          <h1>
            Your itinerary for {trip.destination}{" "}
            <img
              src="/calendar-custom.png"
              width="50px"
              alt="calendar icon created by Freepik - Flaticon.com"
            />
          </h1>
        </div>
        <h4
          className="itinerary-yelp-redirect"
          onClick={(e) => goToYelpView(trip.id)}
        >
          Looking for ideas? Search the city!
        </h4>
        <div className="itinerary-container">

          <DndProvider backend={HTML5Backend}>
            {allDates.map((d) => (
              <ItineraryList
                key={d}
                id={d}
                date={d}
                itinerary={myItinerary[d]}
                dropCb={moveBox}
                addToItineraryCb={addToItinerary}
              />
            ))}
          </DndProvider>
       
        </div>
      </div>
    </div>
  );
}

export default ItineraryView;
