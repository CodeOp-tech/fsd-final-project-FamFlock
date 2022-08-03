import React, { useContext, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import TripsContext from "../context/TripsContext.js";

function MarkerTable(props) {
  const {
    trip,
    addNewTripAddress,
    tripAddresses,
    deleteTripAddress,
    loadTripAddresses,
  } = useContext(TripsContext);

  useEffect(() => {
    if (trip) {
      loadTripAddresses(trip.id);
    }
  }, [trip]);

  return (
    <div>
      <h3> Addressess from your itinerary</h3>
      <div>
        <table className="MarkerTable table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Activity Address</th>
            </tr>
          </thead>
          <tbody>
            {props.places &&
              props.places.map((p) => (
                <tr key={p.activityid}>
                  <td>{p.date}</td>
                  <td>{p.activity}</td>
                  <td>{p.location}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3> Other important addressess of your trip</h3>
        <table className="MarkerTable table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {tripAddresses &&
              tripAddresses.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.formatted_address}</td>
                  <td>
                    <button
                      onClick={() => deleteTripAddress(a.id)}
                      className="btn btn-primary"
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarkerTable;
