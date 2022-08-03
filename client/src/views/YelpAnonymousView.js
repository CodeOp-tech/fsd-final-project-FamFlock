import React, { useState } from "react";
import YelpFormAnonymousSearch from "../components/YelpFormAnonymousSearch.js";
import YelpAnonymousSearchResults from "../components/YelpAnonymousSearchResults.js";

function YelpAnonyMousView() {
  const [searchResults, setSearchResults] = useState(); // Usestate 1

  //returns search results and sets state
  async function searchYelp(filters) {
    let fetchString = "/yelp/businesses/search";
    if (filters) {
      // separate all the keys in the filters object sent.
      let filter = Object.keys(filters)
        // then filter through the fields that actually have a query
        .filter((q) => q.length > 0)
        // map through all those that contain a query and create the key value pair for url (key=value)
        // replace any spaces with a +, for the url if the value is a string
        // the replace method only works on strings, so check if the value is a string.
        .map((e) =>
          typeof filters[e] === "string"
            ? `${e}=${filters[e].replace(" ", "+")}`
            : `${e}=${filters[e]}`
        )
        // join it with an &
        .join("&");
      // then finally, add it onto the url
      fetchString += `?${filter}`;
    }

    let options = {
      method: "GET",
    };
    try {
      let response = await fetch(fetchString, options);
      if (response.ok) {
        let data = await response.json();
        setSearchResults(data.businesses);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  }

  return (
    <div>
      <div className="container">
        <YelpFormAnonymousSearch searchYelpCb={searchYelp}>
          Yelp form component
        </YelpFormAnonymousSearch>
      </div>

      {searchResults && searchResults.length > 0 ? (
        <div className="container">
          <YelpAnonymousSearchResults
            searchResults={searchResults}
          ></YelpAnonymousSearchResults>
        </div>
      ) : null}
    </div>
  );
}

export default YelpAnonyMousView;
