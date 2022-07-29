import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItineraryCard from "./ItineraryCard";

function ItineraryList(props) {
  const [collected, dropRef] = useDrop(() => ({
    accept: "box",

    // this is called when a box is dropped (between columns)
    drop(item, monitor) {
      // pass up the box prop and column id
      props.dropCb(item, props.id);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),

    // possibly include: a box cant be dropped on the column where the drag started?
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
      className={`itinerary-list-wrapper col ${canDropClass}`}
    >
      {/* i think that this as well as sample card could be potentially editable with a similar thing as edit profile
      except onclick would apply to the whole element instead of a button */}
      <h2>Date</h2>
      {/* {props.boxes.map((c) => (
        <ItineraryCard id={c.id} key={c.id}>
          {c.text}
        </ItineraryCard>
      ))} */}
    </div>
  );
}

export default ItineraryList;
