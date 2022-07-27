import React, { useState } from "react";

function YelpSearchResults(props) {
  const [selected, setSelected] = useState({}); // UseState 2

  function handleClick(id) {
    let selected = null;
    selected = props.searchResults?.filter((e) => e.id === id);
    setSelected(selected[0]);
  }
  return (
    <div>
      <h3>Search Results</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Name</h3>
              </th>
              <th>
                <h3>Image</h3>
              </th>
              <th>
                <h3>Details</h3>
              </th>
              <th>
                <h3>Add to itinerary</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.searchResults &&
              props.searchResults.map((r) => (
                <tr key={r.id}>
                  <td>
                    <h3>{r.name}</h3>
                    <h4>{r.price}</h4>

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
                    <b>Address:</b>
                    {r.location.address1},{r.location.city},
                    {r.location.zip_code}
                    <b>Phone:</b>
                    {r.phone}
                  </td>

                  <td>
                    <button onClick={() => handleClick(r.id)}>
                      Add to itinerary
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YelpSearchResults;
