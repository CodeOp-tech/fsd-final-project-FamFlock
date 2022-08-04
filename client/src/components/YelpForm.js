import React, { useState, useContext } from "react";
import TripsContext from "../context/TripsContext.js";
import "./YelpForm.css";

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
      <h2 className="text-start">Yelp Search</h2>

      <div className="container border">
        <div className="col ">
          <h4>Find a restaurant for your group or a place to visit </h4>
        </div>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="row align-items-center">
            <div className="col-6 ">
              <label for="searchBar" className="col-form-label-lg">
                What are you searching for?
              </label>
            </div>
            <div className="col ">
              <input
                id="searchBar"
                type="text"
                name="term"
                className="form-control "
                placeholder="Restaurants, museums, activities, bars, services"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" row align-items-center">
            <div className="col-6 ">
              <label for="accessibility" className="col-form-label-lg">
                Accessibility requirements:{" "}
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                Yes
                <input
                  id="accessibility"
                  className="form-check-input"
                  type="radio"
                  name="attributes"
                  value="wheelchair_accessible"
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="col">
              <label className="form-check-label">
                No
                <input
                  className="form-check-input"
                  type="radio"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row align-items-center">
            <label className="col-5 col-form-label-lg">
              Desired price range?
            </label>
            <div className="col">
              <label for="check1" className="form-check-label">
                $
                <input
                  id="check1"
                  className="form-check-input"
                  type="radio"
                  name="price"
                  value="1"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col">
              <label for="check2" className="form-check-label">
                $$
                <input
                  id="check2"
                  className="form-check-input"
                  type="radio"
                  name="price"
                  value="2"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col">
              <label for="check3" className="form-check-label">
                $$$
                <input
                  id="check3"
                  className="form-check-input"
                  type="radio"
                  name="price"
                  value="3"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col">
              <label for="check4" className="form-check-label">
                $$$$
                <input
                  id="check4"
                  className="form-check-input"
                  type="radio"
                  name="price"
                  value="4"
                  onChange={handleChange}
                />
              </label>

            </div>
          </div>
          <div className="row align-items-center">
            <div className="col align-self-center">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default YelpForm;
