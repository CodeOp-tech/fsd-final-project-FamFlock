import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import Api from "../helpers/Api";
// import ListItemsView from "../views/ListItemsView";

// I want all values to be set and saved when submit, even after refreshing
const TripList = (props) => {
  const [allLists, setAllLists] = useState(props.lists);

  useEffect(() => {
    setAllLists(props.lists);
  }, [allLists]);

  const markComplete = (id) => {
    const updatedLists = allLists.map((list) => {
      if (list.id === id) {
        list.isComplete = !list.isComplete;
      }
      //   updateItems(item);
      return list;
    });
    // setLists(updatedLists);
    console.log(allLists);
    // setAllLists(updatedLists);
    // // setUpdatedItems(updatedItems);
    // updateLists(id);
  };

  return (
    <div className="TripList">
      <ul>
        {allLists.map((l /*index*/) => (
          <li key={l.id}>
            <Link to={`/list/${l.id}`}>{l.name}</Link>
            <input
              className=""
              type="checkbox"
              checked={l.isComplete}
              onChange={() => markComplete(l.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
