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
import TripByIdListsView from "./views/TripByIdListsView";
import Local from "./helpers/Local";
import ChatView from "./views/ChatView";
import Api from "./helpers/Api";
import PrivateRoute from "./components/PrivateRoute";
import YelpView from "./views/YelpView";
import ItineraryView from "./views/ItineraryView";
import MapsView from "./views/MapsView";
import TripsContext from "./context/TripsContext";

function App() {
  const [user, setUser] = useState(Local.getUser()); // useState 1: sets logged in user
  const [trips, setTrips] = useState([]); // UseState 2
  const [senderId, setSenderId] = useState(1); // default sender ID // useState 3
  const [groupId, setGroupId] = useState(1); // default group ID // useState 4
  const [users, setUsers] = useState([]); // useState 5
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 6

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

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    let myresponse = await Api.getUsers();
    if (myresponse.ok) {
      setUsers(myresponse.data);
    } else {
      console.log("response not ok");
    }
  }

  async function newReaction(reaction, FK_user_id, FK_message_id) {
    let myresponse = await Api.newReaction(reaction, FK_user_id, FK_message_id);
    if (myresponse.ok) {
      // setUsers(myresponse.data);
    } else {
      // console.log("response not ok");
    }
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
  const addTrip = async (trip) => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    };
    try {
      let response = await fetch("/trips", options);
      if (response.ok) {
        let data = await response.json();
        setTrips(data);
      } else {
        console.log(`server error: ${response.statud} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  const contextObj = {
    trips,
    addTrip,
  };
  return (
    <div className="App">
      <TripsContext.Provider value={contextObj} r>
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
              user={user}
              users={users}
              newReactionCb={newReaction}
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
          <Route path="/maps" element={<MapsView />} />
          <Route path="/itinerary" element={<ItineraryView />} />
          <Route path="/lists" element={<TripByIdListsView />} />
        </Routes>
      </TripsContext.Provider>
    </div>
  );
}

export default App;
