import React, { useState, useContext } from "react";

const EMPTY_FORM = {};

function YelpFormAnonymousSearch(props) {
  const [search, setSearch] = useState(EMPTY_FORM); // Usestate 1

  function handleChange(event) {
    let { name, value } = event.target;
    setSearch((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    const newSearch = { ...search };
    props.searchYelpCb(newSearch);
    setSearch(EMPTY_FORM);
  }
  return (
    <div>
      <h1>Find inspiration for your next trip! </h1>
      {/* <h2>Find a restaurant for your group or a place to visit </h2> */}

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <h3> Where are you planning to go?</h3>
            <input type="text" name="location" onChange={handleChange} />
          </label>
          <br></br>
          <label>
            <h3>What would you like to do during your trip??</h3>
            Find museaums, activities and even restaurants for your trip meals
            <input type="text" name="term" onChange={handleChange} />
          </label>
          <br></br>
          <h4> Any accessibility requirements? (e.g. wheelchair accesible)</h4>
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
          <h4>Desired price range?</h4>
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

export default YelpFormAnonymousSearch;
