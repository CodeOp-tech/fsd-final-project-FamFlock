import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

function MarkerTable(props) {
  return (
    <div>
      <h3> Addressess from your itinerary</h3>
      <div>
        <table className="MarkerTable table">
          <thead>
            <tr>
              <th>Input Address</th>
              <th>Formatted Address (from OpenCage)</th>
              <th>Latitude/Longitude</th>
            </tr>
          </thead>
          <tbody>
            {props.places.map((p) => (
              <tr key={p.input_address}>
                <td>{p.input_address}</td>
                <td>{p.formatted_address}</td>
                <td>{p.latLng.join("/")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3> Other saved addressess added</h3>
      </div>
    </div>
  );
}

export default MarkerTable;
