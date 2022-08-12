import React, { useState, useEffect, useContext, useParams } from "react";
import AddTripPopUp from "../components/AddTripPopUp.js";
import TripsContext from "../context/TripsContext.js";
import MapsView from "./MapsView.js";
import TripByIdNav from "../components/TripByIdNav.js";
import UserContext from "../context/UserContext";

function TripsView(props) {
  const [openPopUp, setOpenPopUp] = useState(false);
  const { user } = useContext(UserContext);
  const { addTrip, getTrip } = useContext(TripsContext);

  return (
    <div>
      {/* button to add a new trip OPENS POP UP COMPONENT*/}
      <div>
        <button
          className="modalBtn btn btn-primary"
          onClick={() => setOpenPopUp(true)}
        >
          Add New Trip
        </button>
      </div>
      {/* used pop up component */}
      <AddTripPopUp
        addTrip={(trip) => addTrip(trip)}
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        setOpenPopUpCb={setOpenPopUp}
      />
      <div className="container trips-view-container ">
        <div className="trips-view">
          <h2 className="text-center">My Trips</h2>
        </div>
        {/* map through trip cards */}
        {user &&
          user.trips.map((trip) => (
            <div
              className="container"
              key={trip.trip_id}
              style={{ width: "25rem" }}
            >
              <div>
                <h4 className="title">{trip.destination}</h4>
                <h6 className="">
                  {trip.startDate.substring(0, 10)} -{" "}
                  {trip.endDate.substring(0, 10)}
                </h6>
              </div>
              <div className="">
                <button
                  className="btn btn-primary"
                  onClick={(e) => getTrip(trip.trip_id)}
                >
                  Trip Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TripsView;
