import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ItineraryList from "../components/ItineraryList";
import Api from "../helpers/Api";

// const [itineraryLists, setItineraryLists] = useState([{}]);
// const [itineraryList, setItineraryList] = useState([]);
// const [itineraryCards, setItineraryCards] = useState([
//   { Time: "7:00", Activity: "Dinner at Cal Pep" },
//   { Time: "3:00", Activity: "Walk around Parc Verd" },
// ]);

function ItineraryView(props) {
  const [trip, setTrip] = useState({});
  const [columns, setColumns] = useState(trip.itinerary);
  const [error, setError] = useState("");

  //   useEffect(() => {
  //     getTrip(id);
  //   }, []);

  //   defining cards for pass on to children
  let card = [`${trip.activity} ${trip.time}`];

  // get trip by id
  //   async function getTrip(id) {
  //     let myresponse = await Api.getTrip(id);
  //     console.log(id);
  //     if (myresponse.ok) {
  //       setTrip(myresponse.data);
  //       //   Navigate(`/trips/${id}`);
  //     } else {
  //       setError(myresponse.error);
  //     }
  //   }

  function moveBox(item, toColId) {
    let boxId = item.itineraryid;
    let fromColId = item.fromColId;

    let newColumns = { ...columns };
    //   find index of the box to be moved
    let index = newColumns[fromColId].findIndex((b) => b.id === boxId);
    // remove from old column by splicing
    let boxes = newColumns[fromColId].splice(index, 1);
    // add it to the new column
    newColumns[toColId].push(boxes[0]);
    // update state
    setColumns((columns) => newColumns);
  }

  return (
    <div>
      <h1>Itinerary for Your Trip 📅 </h1>
      <div className="itinerary-list-wrapper">
        {/* i think that this as well as sample card could be potentially editable with a similar thing as edit profile
      except onclick would apply to the whole element instead of a button */}

        <DndProvider backend={HTML5Backend}>
          <ItineraryList id={trip.itineraryid} cards={card} dropCb={moveBox} />
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
  );
}

export default ItineraryView;
