import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddTripPopUp from "../components/AddTripPopUp.js";

function TripsView(props) {
  const [trips, setTrips] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = () => {
    fetch("/trips")
      .then((response) => response.json())
      .then((trips) => {
        setTrips(trips);
        console.log(trips);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTrip = async (trip) => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    };
    try {
      let response = await fetch("/trips", options);
      if (response.ok) {
        let data = await response.json();
        setTrips(data);
      } else {
        console.log(`server error: ${response.statud} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  return (
    <div>
      {/* button to add a new trip OPENS POP UP COMPONENT*/}
      <div>
        <button className="modalBtn" onClick={() => setOpenPopUp(true)}>
          Add New Trip
        </button>
      </div>
      {/* used pop up component */}
      <AddTripPopUp
        addTrip={(trip) => addTrip(trip)}
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
      />
      <div className="container">
        {/* map through trip cards */}
        {trips &&
          trips.map((trip) => (
            <div className="row" key={trip.id} style={{ width: "25rem" }}>
              <div className="card-body">
                <h4 className="card-title">{trip.destination}</h4>
                <h6 className="card-text">
                  {trip.startDate} - {trip.endDate}
                </h6>
              </div>
              {/* button for editing trip info ///// !!NOT FUNCTION YET!! ///// */}
              <div className="card-footer">
                <Link to={"/trips/" + trip.id}>
                  <button className="btn btn-outline-primary">Edit</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TripsView;
