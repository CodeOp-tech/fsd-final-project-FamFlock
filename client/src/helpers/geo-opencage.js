import opencage from "opencage-api-client";
// source: Jim's MapsAndGeo Demo
const OCD_API_KEY = process.env.REACT_APP_OCD_API_KEY;
/*
This helper file contains all "knowledge" of OpenCage: How to send requests,
how to get the API key, and how to extract the desired info from the response.

Note that the only difference between forward/reverse geocode requests is what you
pass as 'q': pass an address for forward, and lat,lng for reverse.
*/

/**
 * Forward geocode: address => latitude/longitude
 **/

async function geocode(address) {
  let geoParams = {
    q: address,
    key: OCD_API_KEY,
    no_annotations: 1,
  };
  console.log(OCD_API_KEY);
  let myresponse = { ok: false, data: null, status: 0, error: "" };
  try {
    let response = await opencage.geocode(geoParams);
    console.log("OC response", response);
    if (response.status.code === 200) {
      if (response.results.length > 0) {
        myresponse.ok = true;
        // Save bits of OC response that interest us
        // The first result is the best result
        let g = response.results[0].geometry;
        myresponse.data = {
          latLng: [g.lat, g.lng],
          formatted_address: response.results[0].formatted,
        };
      } else {
        // No results found; this is essentially a 404
        myresponse.status = 404;
        myresponse.error = "Address not found";
      }
    } else {
      myresponse.status = response.status.code;
      myresponse.error = response.status.text;
    }
  } catch (err) {
    myresponse.error = err.message;
  }

  console.log("geocode myresponse:", myresponse);

  return myresponse;
}

/**
 * Reverse geocode: latitude,longitude => address
 **/

async function revgeocode(latLng) {
  let geoParams = {
    q: latLng.join(","),
    key: OCD_API_KEY,
    no_annotations: 1,
  };

  let myresponse = { ok: false, data: null, status: 0, error: "" };
  try {
    let response = await opencage.geocode(geoParams);
    if (response.status.code === 200) {
      // Save bits of OC response that interest us
      let comps = response.results[0].components;
      myresponse.ok = true;
      myresponse.data = {
        formatted_address: response.results[0].formatted,
        street: comps.road,
        city: comps.city,
        country: comps.country,
      };
    } else {
      myresponse.status = response.status.code;
      myresponse.error = response.status.text;
    }
  } catch (err) {
    myresponse.error = err.message;
  }

  console.log("revgeocode myresponse:", myresponse);

  return myresponse;
}

export { geocode, revgeocode };
