import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import TripsView from "./views/TripsView";
import RegisterView from "./views/RegisterView";
import MyProfileView from "./views/MyProfileView";
import Local from "./helpers/Local";
import Api from "./helpers/Api";

function App() {
  let [trips, setTrips] = useState([]); // STATE 1
  const [user, setUser] = useState(Local.getUser()); // useState 1: sets logged in user
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 2

  // log in
  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMessage("");
    } else {
      setLoginErrorMessage("Login failed");
    }
  }

  // log out
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  // register


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/my-trips" element={<TripsView trips={trips} />} />
        <Route
          path="/login"
          element={
            <LoginView
              loginCb={(username, password) => doLogin(username, password)}
            />
          }
        />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/profile/:id" element={<MyProfileView user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
