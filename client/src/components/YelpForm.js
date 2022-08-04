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
      <div>
        <div className="container">
          <h4>Find a restaurant for your group or a place to visit </h4>
        </div>
        <form className="form-group" onSubmit={handleSubmit}>
          <div>
            <label>
              What are you searching for?
              <input
                type="text"
                name="term"
                className="form-control"
                placeholder="Restaurants, museums, activities, bars, services"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <p> Accessibility requirements(wheelchair accesible): </p>
            <label className="form-check-label">
              Yes
              <input
                className="form-check-input"
                type="radio"
                name="attributes"
                value="wheelchair_accessible"
                onChange={handleChange}
              />
            </label>
            <label className="form-check-label">
              No
              <input
                className="form-check-input"
                type="radio"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-check form-check-inline">
            <div className="price-inputs">
              <p>Desired price range?</p>
              <div>
                <label className="form-check-label">
                  $
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="1"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="form-check-label">
                  $$
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="2"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="form-check-label">
                  $$$
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="3"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="form-check-label">
                  $$$$
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="4"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default YelpForm;
