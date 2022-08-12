import React, { useContext } from "react";
import TripsContext from "../context/TripsContext.js";
import { useDrag } from "react-dnd";

function ItineraryCard(props) {
  // let itinerary = props.itinerary;
  const { trip, deleteItineraryActivity } = useContext(TripsContext);

  // function to delete a card
  function deleteItem(e) {
    deleteItineraryActivity(props.itinerary.activityid);
  }

  const [collected, dragRef] = useDrag(() => ({
    type: "box",

    // this is called when a drag starts
    item: () => {
      let col = document.getElementById(
        props.itinerary.localeDate
      ).parentElement;

      // return ids of box and column where drag started
      return {
        id: props.id,
        activityid: props.itinerary.activityid,
        fromColId: props.id,
      };
    },
  }));

  return (
    <div>
      <div className="itinerary-list-card" id={props.activityid} ref={dragRef}>
        <button
          onClick={(e) => deleteItem(props.itinerary.activityid)}
          className="itinerary-card-x"
        >
          x
        </button>{" "}
        {props.children}
      </div>
    </div>
  );
}

export default ItineraryCard;
