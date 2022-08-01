import React, { useState, useEffect } from "react";
import TripByIdList from "../components/TripByIdList";
import Api from "../helpers/Api";

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
    try {
      let response = await Api.newList(list);
      if (response.ok) {
        setLists(response.data);
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
