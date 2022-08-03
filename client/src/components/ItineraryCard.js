import React from "react";
import { useDrag } from "react-dnd";

// props here is gonna be itinerary time and activity
function ItineraryCard(props) {
  let itinerary = props.itinerary;
  const [collected, dragRef] = useDrag(() => ({
    type: "box",

    // this is called when a drag starts
    item: () => {
      let col = document.getElementById(
        props.itinerary.localeDate
      ).parentElement;

      // return ids of box and column where drag started
      console.log(props.itinerary);
      return {
        id: props.id,
        activityid: props.itinerary.activityid,
        fromColId: props.id,
      };
    },
  }));

  return (
    <div>
      {/* javascript insert time, activity, and location */}
      <div className="itinerary-list-card" id={props.activityid} ref={dragRef}>
        {" "}
        {props.children}
      </div>
    </div>
  );
}

export default ItineraryCard;
