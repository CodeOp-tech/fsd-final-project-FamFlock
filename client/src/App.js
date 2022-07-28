import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import TripsView from "./views/TripsView";
import RegisterView from "./views/RegisterView";
import MyProfileView from "./views/MyProfileView";
import TripByIdView from "./views/TripByIdView";
import Local from "./helpers/Local";
import ChatView from "./views/ChatView";
import Api from "./helpers/Api";
import PrivateRoute from "./components/PrivateRoute";
import YelpView from "./views/YelpView";
import ItineraryView from "./views/ItineraryView";

function App() {
  const [user, setUser] = useState(Local.getUser()); // useState 1: sets logged in user
  const [senderId, setSenderId] = useState(1); // default sender ID // useState 2
  const [groupId, setGroupId] = useState(1); // default group ID // useState 3
  const [receiverId, setReceiverId] = useState(); // default receiver ID // useState 4
  // const [user, setUser] = useState(Local.getUser()); // useState 1: sets logged in user
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 5
  const [error, setError] = useState(""); // useState 6: for error mssg
  const navigate = useNavigate();

  // log in
  async function doLogin(username, password) {
    // console.log(user);

    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMessage("");
      navigate("/my-trips");
    } else {
      setLoginErrorMessage("Login failed");
    }
  }

  // log out
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  // register a new user
  async function register(email, username, password, fullname, picture) {
    let myresponse = await Api.newUser(
      email,
      username,
      password,
      fullname,
      picture
    );
    if (myresponse.ok) {
      // browser popup saying you've been registered
      alert("You have been registered!");
      //  log them in automatically
      doLogin(username, password);
    } else {
      setLoginErrorMessage("Registration failed");
    }
  }

  // edit user profile
  async function editUser(
    picture,
    fullname,
    email,
    username,
    currentpassword,
    newpassword,
    id
  ) {
    let myresponse = await Api.editUser(
      picture,
      fullname,
      email,
      username,
      currentpassword,
      newpassword,
      id
    );
  }

  return (
    <div className="App">
      <NavBar logoutCb={doLogout} user={user} />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="chat/:groupId"
          element={
            <ChatView
              senderId={senderId}
              setSenderIdCb={setSenderId}
              groupId={groupId}
              setGroupIdCb={setGroupId}
              receiverId={receiverId}
              setReceiverIdCb={setReceiverId}
            />
          }
        />

        <Route
          path="/my-trips"
          element={
            <PrivateRoute>
              <TripsView />
            </PrivateRoute>
          }
        />

        <Route path="/yelp-search" element={<YelpView />} />
        <Route
          path="/login"
          element={
            <LoginView
              loginCb={(username, password) => doLogin(username, password)}
            />
          }
        />
        <Route
          path="/register"
          element={<RegisterView registerCb={register} />}
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <MyProfileView user={user} editUserCb={editUser} />
            </PrivateRoute>
          }
        />
        <Route path="/my-trips/:id" element={<TripByIdView />} />
        <Route path="/itinerary" element={<ItineraryView />} />
      </Routes>
    </div>
  );
}

export default App;
