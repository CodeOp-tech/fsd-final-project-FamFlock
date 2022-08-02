import React, { useState, useEffect, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ItineraryList from "../components/ItineraryList";
import Api from "../helpers/Api";
import TripsContext from "../context/TripsContext.js";
import TripByIdNavCss from "../components/TripByIdNav.css";
import TripByIdNav from "../components/TripByIdNav";

// import the trip, getTrip, and getItineraries from context
// set initcolumns as the date field in trip (filter?)

function ItineraryView(props) {
  let addToItinerary = props.addToItinerary;
  const { trip, getTrip, itineraries, fetchItineraries } =
    useContext(TripsContext);

  //  let itineraryByDate = {
  //   col1: [{ date: trip["itinerary"][i].date,
  //   text: `${trip["itinerary"][i].activity} at ${trip["itinerary"][i].location}` }]
  //  }

  let InitColumns = {
    //   col1: [{ id: "box1", text: "La Pedrera at 6" }],
    //   col2: [{ id: "box2", text: "Dinner at 7" }],
    //   col3: [{ id: "box3", text: "Lunch at 2" }],
    // col1.push({id: trip["itinerary"][i].activityid,
    // text: `${trip["itinerary"][i].activity} at ${trip["itinerary"][i].location}`})
  };
  //   console.log(trip["itinerary"]);

  for (let i = 0; i < trip["itinerary"].length; i++) {
    InitColumns[`col${i}`] = [
      {
        //   change this to date
        // id: trip["itinerary"][i].activityid,
        id: trip["itinerary"][i].activityid,
        text: `${trip["itinerary"][i].activity} at ${trip["itinerary"][i].location}`,
      },
    ];
  }

  let uniqueDates = {};
  for (let i = 0; i < trip["itinerary"].length; i++) {
    uniqueDates[trip["itinerary"][i].date] = true;
  }

  //   let uniqueDates = [];
  //   while (trip.startDate <= trip.endDate) {
  //     uniqueDates.push(new Date(trip.startDate));
  //   }

  let dateColumns = Object.keys(uniqueDates).sort();
  //   let dateColumns = uniqueDates.sort();

  //   for (let itinerary in itineraries) {
  //       if (itineraryByDate[itinerary[date]] === undefined) {
  //         itineraryByDate[itinerary[date]] === itineraryByDate[itinerary[0].date]
  //       }
  //   }

  //   console.log(InitColumns);
  const [columns, setColumns] = useState(InitColumns);

  //   useEffect(() => {
  //     getTrip(id);
  //   }, []);

  //   defining cards for pass on to children
  //   let card = [`${trip.activity} ${trip.time}`];

  function moveBox(item, toColId) {
    let boxId = item.id;
    let fromColId = item.fromColId;

    let newColumns = { ...columns };
    //   find index of the box to be moved
    // console.log("Hello", newColumns, "hEY", fromColId);
    // let index = newColumns[fromColId].findIndex((b) => b.id === boxId);
    // remove from old column by splicing
    // let boxes = newColumns[fromColId].splice(index, 1);
    // add it to the new column
    // newColumns[toColId].push(boxes[0]);
    // update state
    setColumns((columns) => newColumns);
  }

  return (
    <div>
      <TripByIdNav />
      <div className="tripById">
        <h1>Your Itinerary for {trip.destination} 📅 </h1>
        <Link to={"/yelp-search"}>
          Looking for ideas? Search the city!
        </Link> || <p onClick={(e) => getTrip(trip.id)}>Back to trip page</p>
        <div className="itinerary-container">
          {/* i think that this as well as sample card could be potentially editable with a similar thing as edit profile
      except onclick would apply to the whole element instead of a button */}

          <DndProvider backend={HTML5Backend}>
            {dateColumns.map((i) => (
              <ItineraryList
                key={""}
                id={i}
                date={i}
                itinerary={trip["itinerary"]}
                dropCb={moveBox}
                addToItineraryCb={addToItinerary}
              />
            ))}
          </DndProvider>
          {/* javascript insert time, activity, and location */}
          {/* {itineraryCards.map((card, index) => (
          <div key={index} className="itinerary-list-card" draggable>
            {card.Time}: {card.Activity}
          </div>
        ))} */}
          {/* <p>Time: Activity at Location</p> */}
        </div>
      </div>
    </div>
  );
}

export default ItineraryView;
