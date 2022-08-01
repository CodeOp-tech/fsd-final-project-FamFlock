import React from "react";
import { useDrag } from "react-dnd";

// props here is gonna be itinerary time and activity
function ItineraryCard(props) {
  let itinerary = props.itinerary;
  const [collected, dragRef] = useDrag(() => ({
    type: "box",

    // this is called when a drag starts
    item: () => {
      let col = document.getElementById(props.id).parentElement;
      // return ids of box and column where drag started
      return { id: props.id, fromColId: col.id };
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
