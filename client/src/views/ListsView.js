import React, { useState, useEffect, useContext } from "react";
// import "../components/ListsView";
import TripList from "../components/TripList";
import NewListForm from "../components/NewListForm";
// import Api from "../helpers/Api";
import TripsContext from "../context/TripsContext";
import TripByIdView from "./TripByIdView";

function ListsView() {
  const [allLists, setAllLists] = useState([]);
  const { trip } = useContext(TripsContext);

  useEffect(() => {
    getLists();
  }, []);

  // fetch from database
  const getLists = () => {
    fetch("/lists")
      .then((response) => response.json())
      .then((lists) => {
        setAllLists(lists);
        // console.log(lists);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function addList(newList) {
    console.log(trip);
    newList.FK_trips_id = trip.id;
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
    };
    try {
      let response = await fetch("/lists", options);
      if (response.ok) {
        let data = await response.json();
        setAllLists(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  return (
    <div className="ListsView">
      <TripByIdView />
      <div className="tripById">
        <h1>Lists for Your Trip!</h1>

        <h2>List for Trip</h2>
        <TripList lists={allLists} />

        <h2>Add a List</h2>
        <NewListForm addListCb={addList} />
      </div>
    </div>
  );
}

export default ListsView;
