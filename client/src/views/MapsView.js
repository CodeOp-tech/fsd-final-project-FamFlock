import React, { useState, useEffect, useContext } from "react";
import MapMarkerTable from "../components/MapMarkerTable";
import MapMarker from "../components/MapMarker";
import MapAddressForm from "../components/MapAddressForm";
import { getHome } from "../helpers/geoLocation";
//import TripsContext from "../Context/TripsContext";
import { geocode } from "../helpers/geo-opencage";

const samplePlaces = [
  {
    latLng: [41.3953996, 2.1617621],
    input_address: "La Pedrera, Barcelona,Spain",
    formatted_address: "La Pedrera, Barcelona,Spain",
  },
  {
    latLng: [41.380899, 2.1229225],
    input_address: "Camp Nou, Barcelona Spain",
    formatted_address: "Camp Nou, Barcelona Spain",
  },
  {
    latLng: [41.3916202, 2.15248],
    input_address: "Paco Meralgo, Barcelona Spain",
    formatted_address: "Paco Meralgo, Barcelona Spain",
  },
];
function MapsView(props) {
  const [home, setHome] = useState([41.3828939, 2.1774322]); //useState 1 -  center of map  (destination of trips table)
  const [places, setPlaces] = useState(samplePlaces); // useState 2 - should be passed by props from itinerary
  const [address, setAddress] = useState("");

  // let { trips } = useContext(TripsContext);
  // const destination = trips[0].destination;

  //   useEffect(() => {
  //     callSetHome();
  //   }, []);

  // ******These functions will be useful when we want to change the "home" to the live user location****
  //   useEffect(() => {
  //     getAndSetHome();
  //   }, []);

  //   async function getAndSetHome(destination) {
  //     console.log(destination);
  //     let latLng = await getHome(); // returns [lat, lng]
  //     setHome(latLng);
  //   }
  //**************************** */

  //   function callSetHome() {
  //     //props.trips && setHome(props.trips[0].destination);
  //     setHome("Barcelona");
  //   }

  async function addMarkerForAddress(addr) {
    // Send a request to OpenCage to geocode 'addr'
    let myresponse = await geocode(addr);
    console.log(myresponse);
    if (myresponse.ok) {
      if (myresponse.data.latLng) {
        // Create new 'place' obj
        let d = myresponse.data;
        let newPlace = {
          latLng: d.latLng,
          input_address: addr,
          formatted_address: d.formatted_address,
        };
        // Add it to 'places' state
        setPlaces((places) => [...places, newPlace]);
      } else {
        console.log("addMarkerForAddress(): no results found");
      }
    } else {
      console.log("addMarkerForAddress(): response.error:", myresponse.error);
    }
  }

  return (
    <div>
      <h1>Your map for your trip to XYZ</h1>
      <div>{home && <MapMarker home={home} zoom={13} />}</div>
      <h3 className="mt-4">Add important addressess to your itinerary</h3>
      <p>Enter an address to add a blue marker on the map</p>
      <MapAddressForm addMarkerCb={(addr) => addMarkerForAddress(addr)} />
      <div>
        <MapMarkerTable places={places} />
      </div>
      ;
    </div>
  );
}

export default MapsView;
