import React, { useState, useEffect, useContext } from "react";
import MapMarkerTable from "../components/MapMarkerTable";
import MapMarker from "../components/MapMarker";
import MapAddressForm from "../components/MapAddressForm";
import { getHome } from "../helpers/geoLocation";
import { geocode, revgeocode } from "../helpers/geo-opencage";
import TripsContext from "../context/TripsContext.js";
import UserContext from "../context/UserContext";

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
  const [home, setHome] = useState(); //useState 1 -  center of map  (destination of trips table)
  const [places, setPlaces] = useState(); // useState 2 - should be passed by props from itinerary and addresses transformed with geocode
  const [newPlaces, setNewPlaces] = useState([]);
  const [address, setAddress] = useState("");
  const { user } = useContext(UserContext);
  const { trip } = useContext(TripsContext);

  useEffect(() => {
    getAndSetHome();
  }, []);

  useEffect(() => {
    if (home && trip) {
      setPlacesOfItinerary();
    }
  }, [home, trip]);

  //This function centers the map ( "home") to the trips destination or to the  live user location of browser****
  async function getAndSetHome() {
    let latLng = await getHome(); // returns [lat, lng]
    trip && setHome(latLng);
  }

  // Send a request to OpenCage to geocode 'addr'
  async function addMarkerForAddress(addr) {
    let myresponse = await geocode(addr.address);

    if (myresponse.ok) {
      if (myresponse.data.latLng) {
        // Create new 'place' obj
        let d = myresponse.data;
        let newPlace = {
          latLng: d.latLng,
          name: addr.addressName,
          formatted_address: d.formatted_address,
        };
        // Add it to 'new Places' state
        setNewPlaces((x) => [...newPlaces, newPlace]);
      } else {
        console.log("addMarkerForAddress(): no results found");
      }
    } else {
      console.log("addMarkerForAddress(): response.error:", myresponse.error);
    }
  }

  async function setPlacesOfItinerary() {
    let newArray = [];
    for (let activity of trip.itinerary) {
      let response = await geocode(activity.location);
      let newObj = {
        activityid: activity.activityid,
        latLng: response.data.latLng,
        location: response.data.formatted_address,
        activity: activity.activity,
        date: activity.date,
      };
      newArray.push(newObj);
    }
    setPlaces(newArray);
  }

  return (
    <div>
      <h1>Your map for your trip to XYZ</h1>
      <div>
        {home && (
          <MapMarker
            places={places}
            home={home}
            zoom={13}
            newPlaces={newPlaces}
          />
        )}
      </div>
      <h3 className="mt-4">Add important addressess to your itinerary</h3>
      <p>Enter an address to add a blue marker on the map</p>
      <MapAddressForm addMarkerCb={(addr) => addMarkerForAddress(addr)} />

      <div>
        <MapMarkerTable places={places} newPlaces={newPlaces} />
      </div>
    </div>
  );
}

export default MapsView;
