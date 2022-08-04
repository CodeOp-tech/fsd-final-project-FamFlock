import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import "../components/ListsView";
// import TripList from "../components/TripList";
import NewListForm from "../components/NewListForm";
import TripsContext from "../context/TripsContext";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";

function ListsView() {
  const [allLists, setAllLists] = useState([]);
  const [error, setError] = useState([]);
  const { trip } = useContext(TripsContext);

  console.log("this is trip from ListsView" + trip);

  useEffect(() => {
    getLists();
  }, []);

  // fetch from database
  const getLists = () => {
    fetch("/lists")
      .then((response) => response.json())
      .then((lists) => {
        setAllLists(lists);
        console.log(lists);
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

  const updateList = async (listId) => {
    let idx = allLists.findIndex((list) => list.id === listId);
    try {
      let res = await fetch(`/lists/${listId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isComplete: allLists[idx].isComplete,
        }),
      });
      if (!res.ok) throw res.statusText;
      const data = await res.json();
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };

  const markComplete = (id) => {
    const updatedLists = allLists.map((list) => {
      if (list.id === id) {
        list.isComplete = !list.isComplete;
      }
      //   updateItems(item);
      return list;
    });

    console.log(allLists);
    setAllLists(updatedLists);
    updateList(id);
  };

  return (
    <div className="ListsView">
      <TripByIdNav />
      <div className="tripById">
        <h2>Click the List to see your tasks</h2>
        {/* make them links to item.id */}
        {/* <TripList lists={allLists} /> */}
        <div className="card">
          <div className="card-header">
            <h4>All your Lists for {trip.destination}</h4>
          </div>
          <ul className="list-group list-group-flush">
            {allLists.map((l /*index*/) => (
              <div className="" key={l.id}>
                <button>
                  <Link to={`/list/${l.id}`}>{l.name}</Link>
                  <input
                    value=""
                    aria-label="Checkbox following text input"
                    type="checkbox"
                    checked={l.isComplete}
                    onChange={() => markComplete(l.id)}
                  />
                </button>
                {/* <button onClick={() => deleteList(l.id)}>Delete</button> */}
              </div>
            ))}
          </ul>
        </div>

        <h5>Add a New List here</h5>
        <NewListForm addListCb={addList} />
      </div>
    </div>
  );
}

export default ListsView;
