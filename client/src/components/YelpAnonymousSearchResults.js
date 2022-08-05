import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function YelpAnonymousSearchResults(props) {
  const { goToLogin } = useContext(UserContext);

  return (
    <div>
      <h2 className="text-start">Search Results</h2>
      <div className="container">
        <div className="table-responsive-sm">
          <table className="table table-hover ">
            <thead>
              <tr>
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
                        onClick={(e) => goToLogin(e)}
                        className="btn btn-primary"
                      >
                        Add to Itinerary
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

export default YelpAnonymousSearchResults;
