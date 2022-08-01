// import { ListItemSecondaryAction } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import "../components/ListsView";
import TripList from "../components/TripList";
import NewListForm from "../components/NewListForm";
// import Api from "../helpers/Api";

function ListsView() {
  const [allLists, setAllLists] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  // const [list, setList] = useState(/*what is it suppossed to be?*/); // have not used this yet

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

  // const AddListButton = () => {
  //   const newList = { name: inputValue, isComplete: false };

  //   const newLists = [...lists, newList];

  //   setLists(newLists);
  //   setInputValue("");
  // };

  // const toggleComplete = (index) => {
  //   const newLists = [...lists];
  //   newLists[index].isComplete = !newLists[index].isComplete;
  //   setLists(newLists);
  // };

  // add a new list to lists
  // const addList = async (list) => {
  //   try {
  //     let response = await Api.newList(list);
  //     if (response.ok) {
  //       setLists(response.data);
  //     } else {
  //       console.log(`server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`network error: ${err.message}`);
  //   }
  // };

  // function handleChange(event) {
  //   let { name, value } = event.target;
  //   // not complete

  // Set list to the check value
  //   setList((state) => ({
  //     ...state,
  //     [name]: value,
  //   }));
  //   // console.log(list);
  // }

  // onSubmit function saves form checkboxes info to the TripLists,
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(list);
  //   addList(list);
  // };

  async function addList(newList) {
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
      <h1>Lists for Your Trip!</h1>

      <h2>List for Trip</h2>
      <TripList lists={allLists} />

      <h2>Add a List</h2>
      <NewListForm addListCb={addList} />
      {/* <TripList
        lists={lists}
        inputValue={inputValue}
        setInputValue={setInputValue}
        OnClick={AddListButton}
        OnChange={toggleComplete}
        OnSubmit={handleSubmit}
        handleChange={handleChange}
      /> */}
    </div>
  );
}

export default ListsView;
