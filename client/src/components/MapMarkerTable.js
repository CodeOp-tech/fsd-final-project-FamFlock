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

  // Courtesy of Jim!
  //    converts sql date to human
  function convertDbDateToHuman(dbDateTime) {
    // Create a date obj
    let dateObj = new Date(dbDateTime);

    // Convert it to a (long) human readable format
    let humanReadable = dateObj.toString(); // 'Fri Jul 08 2022 00:00:00 GMT+0200'

    // I only want to keep the date part of it
    let humanDate = humanReadable.substring(4, 15); // 'Jul 08 2022'

    return humanDate;
  }

  return (
    <div>
      <div className=" table-responsive-sm">
        <h2 className="text-start"> Addresses in your itinerary</h2>

        <table className="MarkerTable table table-hover">
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
                  <td>{convertDbDateToHuman(p.date)}</td>
                  <td>{p.activity}</td>
                  <td>{p.location}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="">
        <h2 className="text-start"> Other important addresses for your trip</h2>
        <div className="table-responsive-sm">
          <table className="MarkerTable table table-hover">
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
                        className="btn btn-primary shadow"
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
    </div>
  );
}

export default MarkerTable;
