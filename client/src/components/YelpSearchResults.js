import React, { useState } from "react";
import YelpPopUpAddItinerary from "./YelpPopUpAddItinerary";
import "./YelpSearchResults.css";

// define empty form
const EMPTY_FORM = {
  activity: "",
  date: "",
  location: "",
  time: "",
  //   date is column date
};

function YelpSearchResults(props) {
  const [selected, setSelected] = useState({}); // useState 1
  const [formData, setFormData] = useState(EMPTY_FORM); //useState 2
  const [openPopUp, setOpenPopUp] = useState(false);

  function handleClick(id) {
    let selected = null;
    selected = props.searchResults?.filter((e) => e.id === id);
    setSelected(selected[0]);
    setOpenPopUp(true);
  }
  return (
    <div className="YelpSearchResults container">
      <div>
        <YelpPopUpAddItinerary
          selected={selected}
          open={openPopUp}
          onClose={() => setOpenPopUp(false)}
        />
      </div>

      <div>
        <h2 className="text-start">Search Results</h2>
      </div>
      <div className="container">
        <div className="table-responsive-sm">
          <table className="table table-hover ">
            <thead>
              <tr className="first-row">
                <th>
                  <h4>Name</h4>
                </th>
                <th>
                  <h4>Image</h4>
                </th>
                <th>
                  <h4>Details</h4>
                </th>
                <th>
                  <h4>Add to Itinerary</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.searchResults &&
                props.searchResults.map((r) => (
                  <tr className="align-items-center align-middle" key={r.id}>
                    <td>
                      <h4>{r.name}</h4>
                      <h5>{r.price}</h5>

                      <img
                        src={`/YelpImages/${r.rating}.png`}
                        alt={`rating ${r.rating}`}
                        width="60"
                      />
                      <a href={r.url} target="_blank" rel="noreferrer">
                        <img
                          alt="yelp logo"
                          src="/YelpImages/yelp_logo.png"
                          width="60"
                        ></img>
                      </a>
                      <p>Based on{" " + r.review_count + " "}reviews</p>
                    </td>
                    <td>
                      <img
                        src={r.image_url}
                        width="120"
                        height="120"
                        alt={"image of" + r.name}
                      />
                    </td>
                    <td>
                      <b>Address: </b>
                      {r.location.address1}, <br /> {r.location.city},{" "}
                      {r.location.zip_code} <br />
                      <b>Phone: </b>
                      {r.phone}
                    </td>

                    <td>
                      <button
                        className="btn btn-primary shadow"
                        onClick={() => handleClick(r.id)}
                      >
                        Add to itinerary
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default YelpSearchResults;
