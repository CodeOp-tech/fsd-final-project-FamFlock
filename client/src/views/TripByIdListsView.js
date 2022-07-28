import React, { useState, useEffect } from "react";
import TripByIdList from "../components/TripByIdList";

function TripByIdListsView() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = () => {
    fetch("/lists")
      .then((response) => response.json())
      .then((lists) => {
        setLists(lists);
        // console.log(lists);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addList = async (list) => {
    let options = {
      method: "POST",
      headers: { "Content=Type": "application/json" },
      body: JSON.stringify(list),
    };
    try {
      let response = await fetch("/list", options);
      if (response.ok) {
        let data = await response.json();
        setLists(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Lists to Get Ready for Your Trip!</h1>
      <TripByIdList addList={(list) => addList(list)} />
    </div>
  );
}

export default TripByIdListsView;
