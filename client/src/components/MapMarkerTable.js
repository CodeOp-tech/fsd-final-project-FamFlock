import React, { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";

function MarkerTable(props) {
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
            {props.newPlaces &&
              props.newPlaces.map((p) => (
                <tr key={p.latLng}>
                  <td>{p.name}</td>
                  <td>{p.formatted_address}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarkerTable;
