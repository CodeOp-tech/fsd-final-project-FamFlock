import React from "react";
// import Api from "../helpers/Api";
// import ListsView from "../views/ListsView";

// I want all values to be set and saved when submit, even after refreshing
const TripList = (props) => {
  return (
    <div className="TripList">
      <ul>
        {props.lists.map((l /*index*/) => (
          <li key={l.id}>
            {l.name} {l.isComplete}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;

{
  /* <>
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
                <div className="list" key={index}>
                  <div
                    className="list-name"
                    onChange={() => toggleComplete(index)}
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
        </form> */
}
