import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import "../components/ListsView";
// import TripList from "../components/TripList";
import NewListForm from "../components/NewListForm";
import TripsContext from "../context/TripsContext";
import TripByIdNav from "../components/TripByIdNav";
import "../components/TripByIdNav.css";
import "./ListsView.css";

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

  const deleteList = async (listId) => {
    try {
      let res = await fetch(`/lists/${listId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw res.statusText;
      const data = await res.json();
      setAllLists(data);
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="lists-view">
      <TripByIdNav />
      <div className="tripById">
        <div className="lists-container container">
          <h2 className="lists-container-header text-start">Your lists</h2>
          <div className="border-light mb-3">
            <div className="">
              <h4>{trip.destination}</h4>
            </div>
            <div className="grid grid-cols-2">
              <div className="mt-4 divide-y bg-white shadow rounded p-4">
                {allLists.map((l /*index*/) => (
                  <div>
                    <div key={l.id} className="flex justify-between">
                      <input
                        type="checkbox"
                        checked={l.isComplete}
                        onChange={() => markComplete(l.id)}
                      />
                      <h5> {l.name}</h5>

                      <button className="btn btn-primary">
                        <Link className="text-white" to={`/list/${l.id}`}>
                          open
                        </Link>
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => deleteList(l.id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="container">
                <h2 className="text-start">Add a New List</h2>
                <NewListForm addListCb={addList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListsView;
