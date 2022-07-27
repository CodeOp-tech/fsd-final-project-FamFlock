import React, { useState } from "react";
import TripByIdList from "../components/TripByIdList";
import { Route, Routes, useNavigate, Link } from "react-router-dom";

function TripByIdView() {
  return (
    <div>
      <h2>Basic info</h2>
      <h2>Members</h2>
      <h2>Chat</h2>
      <nav>{/* <Link to={"/chat"}> View the chat here</Link> */}</nav>
      <h2>Itinerary</h2>
      <Link to={"/itinerary"}>Take a look at your itinerary!</Link>
      <h2>Lists</h2>
      <div className="container">
        <div className="mb-3 accordion accordion-flush accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseUnique"
              aria-expanded="false"
              aria-controls="flush-collapseUnique"
            >
              TripByIdList
            </button>
          </h2>
          <div
            id="flush-collapseUnique"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingUnique"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <TripByIdList />
            </div>
          </div>
        </div>
      </div>
      <h2>Map</h2>
    </div>
  );
}

export default TripByIdView;
