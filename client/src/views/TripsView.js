import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AddTripPopUp from "../components/AddTripPopUp.js";
import TripsContext from "../context/TripsContext.js";
import MapsView from "./MapsView.js";
import TripByIdView from "./TripByIdView.js";

function TripsView(props) {
  const [openPopUp, setOpenPopUp] = useState(false);
  const { trips, addTrip } = useContext(TripsContext);

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
              {/* <div className="card-footer">
                <Link to={"/my-trips/" + trip.id}>
                  <button className="btn btn-outline-primary">Edit</button>
                </Link>
              </div> */}
            </div>
          ))}
      </div>
      {/* <MapsView trips={trips} /> */}
    </div>
  );
}

export default TripsView;
