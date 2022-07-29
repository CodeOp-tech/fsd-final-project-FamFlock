import { ListItemSecondaryAction } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TripList from "../components/TripList";

function ListsView() {
  const [lists, setLists] = useState([{ name: "list 1", isComplete: false }]);
  const [inputValue, setInputValue] = useState("");

  const AddListButton = () => {
    const newList = { name: inputValue, isComplete: false };

    const newLists = [...lists, newLists];

    setLists(newLists);
    setInputValue("");
  };

  const toggleComplete = (index) => {
    const newLists = [...lists];
    newLists[index].isComplete = !newLists[index].isComplete;
    setLists(newLists);
  };

  useEffect(() => {
    getLists();
  }, []);

  // fetch from database
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

  return (
    <div>
      <h1>Lists for Your Trip!</h1>
      <TripList />
    </div>
  );
}

export default ListsView;
