import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import TripsView from "./views/TripsView";

function App() {
  let [trips, setTrips] = useState([]); // STATE 1

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/my-trips" element={<TripsView trips={trips} />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </div>
  );
}

export default App;
