import React, { useState, useEffect } from "react";

function TripsView(props) {
  const trips = props.trips;

  const [featTrip, setFeatTrip] = useState(null);

  useEffect(() => {
    setFeatTrip(trips[0]);
  }, [props.trips]);

  return (
    <div>
      <h4>This is the Trips view</h4>
      {/* trips grid */}
      <div className="row">
        {trips.map((trip) => (
          <div className="card col-md-3 p-4">
            <h4 className="card-title">title{trip.destination}</h4>
            {/*{trips.destination}*/}
            <h6 className="card-subtitle">subtitle{trip.startDate}</h6>
            {/*{trips.startDate}*/}
            <p className="card-text">text{trip.endDate}</p>
            {/*{trips.endDate}*/}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripsView;
