import React, { useState } from "react";
import Api from "../helpers/Api";
// import ListsView from "../views/ListsView";

// I want all values to be set and saved when submit, even after refreshing
const TripList = ({
  lists,
  setLists,
  inputValue,
  setInputValue,
  AddListButton,
  toggleComplete,
}) => {
  const [list, setList] = useState(/*what is it suppossed to be?*/);

  // add a new list to lists
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

  function handleChange(event) {
    let { name, value } = event.target;
    // not complete

    // Set list to the check value
    setLists((state) => ({
      ...state,
      [name]: value,
    }));
    // console.log(list);
  }

  // onSubmit function saves form checkboxes info to the TripLists,
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(list);
    addList(lists);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="main-container">
          <div className="add-item-box">
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="add-list-input"
              placeholder="Add a Name for your List: ex. Packing List..."
            />
            <button
              onClick={() => AddListButton()}
              className="btn btn-outline-primary"
            >
              Add a new List
            </button>
          </div>
          <div className="list-container">
            {lists.map((list, index) => (
              <div className="list">
                <div
                  className="list-name"
                  onClick={() => toggleComplete(index)}
                >
                  {list.isComplete ? (
                    <>
                      <span className="completed">{list.name}</span>
                    </>
                  ) : (
                    <>
                      <span>{list.name}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </form>
    </>
  );
};

{
  /**/
}

export default TripList;
