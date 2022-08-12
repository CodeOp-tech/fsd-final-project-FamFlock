import React, { useState, useContext } from "react";
import "./Components.css";

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
      <img
        src="https://media.istockphoto.com/vectors/airplane-path-line-vector-graphic-vector-illustration-in-a-flat-style-vector-id1188615054?k=20&m=1188615054&s=170667a&w=0&h=6ITuiC73aqUyI1HQQ9RfS0LxJS3pX2Iec_1GiwbZ65s="
        alt="ariplane"
      />
      <div>
        <form onSubmit={handleSubmit} className="form-control">
          <label>
            <h4> Your Destination:</h4>
            <input
              type="text"
              className="form-control anon-yelp-input"
              name="location"
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            <h4>What would you like to search for?</h4>
            <input
              type="text"
              name="term"
              className="form-control anon-yelp-input"
              placeholder="ex. restaurant, museum, excursion"
              onChange={handleChange}
            />
          </label>
          <br></br>
          <h4> Any accessibility requirements?</h4>
          <p>Ex. wheelchair accessible</p>
          <label className="anon-yelp-yes">
            Yes{" "}
            <input
              type="radio"
              name="attributes"
              value="wheelchair_accessible"
              onChange={handleChange}
            />
          </label>
          <label className="anon-yelp=no">
            No <input type="radio" onChange={handleChange} />
          </label>
          <h4>Desired price range?</h4>
          <label>
            $
            <input
              type="radio"
              name="price"
              value="1"
              className="anon-dollar-input"
              onChange={handleChange}
            />
          </label>
          <label>
            $$
            <input
              type="radio"
              name="price"
              value="2"
              className="anon-2dollar-input"
              onChange={handleChange}
            />
          </label>
          <label>
            $$$
            <input
              type="radio"
              name="price"
              value="3"
              className="anon-3dollar-input"
              onChange={handleChange}
            />
          </label>
          <label>
            $$$$
            <input
              type="radio"
              name="price"
              value="4"
              className="anon-4dollar-input"
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            <button className="btn btn-primary">Search</button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default YelpFormAnonymousSearch;
