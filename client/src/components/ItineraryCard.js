import React from "react";
import { useDrag } from "react-dnd";

// props here is gonna be itinerary time and activity
function ItineraryCard(props) {
  const [collected, dragRef] = useDrag(() => ({
    type: "box",

    // this is called when a drag starts
    item: () => {
      let col = document.getElementById(props.id).parentElement;
      // return ids of box and column where drag started
      return { id: props.id, fromColId: col.id };
    },
  }));
  function handleChange(event) {
    let { name, value } = event.target;
    // this needs more stuff
  }
  return (
    <div>
      {/* javascript insert time, activity, and location */}
      <div className="itinerary-list-card" id={props.id} ref={dragRef}>
        {" "}
        {props.children}
      </div>

      <input
        className="itinerary-card-input"
        type="text"
        onChange={handleChange}
        placeholder="Add something..."
      />
    </div>
  );
}

export default ItineraryCard;
