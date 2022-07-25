import React, { useState, useEffect } from "react";

function TripsView(props) {
  const [trips, setTrips] = useState([]);

  //   const [featTrip, setFeatTrip] = useState(null);

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
      <h4>This is the Trips view</h4>
      {/* trips grid */}
      <div className="row">
        {trips.map((trip) => (
          <div className="card col-md-3 p-4" key={trip.trip_id}>
            <h4 className="card-title">title{trip.destination}</h4>
            <h6 className="card-subtitle">subtitle{trip.startDate}</h6>
            <p className="card-text">text{trip.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripsView;
