import { geocode } from "./geo-opencage";
//import TripsContext from "../Context/TripsContext";

// source: Jim's MapsAndGeo Demo with some tweaks for project

/**
 * Determine "home" (the starting latitude/longitude) of the map.
 *
 * It tries these things:
 *   1. use Trips Destination as default Home location
 *   2. Use browser geolocation if the user allows it
 *   3.pending to see if we set something in the params as new home.
 **/

// Enable (or not) console logging
const DEBUG = true;

/**
 * Return [latitude, longitude] to use as the user's location ("home")
 **/

async function getHome(destination) {
  // Check for 'home' query param  ---> Figure out later how to use. THese would be params sent in the url.
  // let params = new URLSearchParams(window.location.search); // parse query params
  // if (params.has("home")) {
  //   let response = await geocode(params.get("home"));
  //   if (response.ok && response.data.latLng) {
  //     if (DEBUG) {
  //       console.log(
  //         "geoloc: query parameter:",
  //         params.get("home"),
  //         response.data
  //       );
  //     }
  //     return response.data.latLng;
  //   }
  // }

  // Browser geolocation --> This will be useful when we can get the live routes going.
  try {
    let opts = { timeout: 2000 };
    let geoPos = await _asyncGetCurrentPosition(opts);
    let { latitude, longitude } = geoPos.coords;
    if (DEBUG) {
      console.log("geoloc: browser location:", latitude, longitude);
    }
    return [latitude, longitude];
  } catch (err) {
    console.log("geoloc: error:", err);
  }

  if (DEBUG) {
    console.log('geoloc: "last resort": trip destination');
  }
  return destination;
}

// Use a promise-based wrapper for (callback-based) browser geolocation function
async function _asyncGetCurrentPosition(options = {}) {
  // here im settting a default value as params, in case i dont receive something
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      // navigator is an object, most updated browsers support it and it provide a series of information
      // This is the JS function that actually gets the browser location
      navigator.geolocation.getCurrentPosition(resolve, reject, options); // the get current position has to be called a certain way with the timeout.https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    } else {
      reject(Error("Browser does not support geolocation"));
    }
  });
}

export { getHome };
