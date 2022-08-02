import React, { useState, useContext } from "react";
import TripsContext from "../context/TripsContext.js";

const EMPTY_FORM = {};

function YelpForm(props) {
  const [search, setSearch] = useState(EMPTY_FORM); // Usestate 1
  const { trip } = useContext(TripsContext);
  const location = trip.destination;

  function handleChange(event) {
    let { name, value } = event.target;
    setSearch((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    const newSearch = { ...search, location };
    props.searchYelpCb(newSearch);
    setSearch(EMPTY_FORM);
  }
  return (
    <div>
      <h1>Activity Search </h1>
      <h2>Find a restaurant for your group or a place to visit </h2>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            What are you searching for?(eg: "italian food" or "museums")
            <input type="text" name="term" onChange={handleChange} />
          </label>
          <br></br>
          <p> Any accessibility requirements? (wheelchair accesible)</p>
          <label>
            Yes
            <input
              type="radio"
              name="attributes"
              value="wheelchair_accessible"
              onChange={handleChange}
            />
          </label>
          <label>
            No
            <input type="radio" onChange={handleChange} />
          </label>
          <p>Desired price range?</p>
          <label>
            $
            <input
              type="radio"
              name="price"
              value="1"
              onChange={handleChange}
            />
          </label>
          <label>
            $$
            <input
              type="radio"
              name="price"
              value="2"
              onChange={handleChange}
            />
          </label>
          <label>
            $$$
            <input
              type="radio"
              name="price"
              value="3"
              onChange={handleChange}
            />
          </label>
          <label>
            $$$$
            <input
              type="radio"
              name="price"
              value="4"
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            <button>Search</button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default YelpForm;
