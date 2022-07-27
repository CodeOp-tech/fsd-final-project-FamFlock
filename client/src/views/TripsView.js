import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PopUp from "../components/PopUp.js";

function TripsView(props) {
  const [openPopUp, setOpenPopUp] = useState(false);

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = () => {
    fetch("/trips")
      .then((response) => response.json())
      .then((trips) => {
        setTrips(trips);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* trips grid */}
      <div>
        <button className="modalBtn" onClick={() => setOpenPopUp(true)}>
          Add New Trip
        </button>
      </div>
      <PopUp open={openPopUp} onClose={() => setOpenPopUp(false)} />
      <div className="container">
        {trips.map((trip) => (
          <div className="row" key={trip.id} style={{ width: "25rem" }}>
            <div className="card-body">
              <h4 className="card-title">{trip.destination}</h4>
              <h6 className="card-text">
                {trip.startDate} - {trip.endDate}
              </h6>
            </div>
            <div className="card-footer">
              <Link to={"/trips/" + trips.id}>
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
