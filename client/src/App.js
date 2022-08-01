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
import ListsView from "./views/ListsView";
import Local from "./helpers/Local";
import ChatView from "./views/ChatView";
import Api from "./helpers/Api";
import PrivateRoute from "./components/PrivateRoute";
import YelpView from "./views/YelpView";
import ItineraryView from "./views/ItineraryView";
import MapsView from "./views/MapsView";
import TripsContext from "./context/TripsContext";
import UserContext from "./context/UserContext";
// import res from "express/lib/response";

function App() {
  const [user, setUser] = useState(null); // useState 1: sets logged in user
  const [trips, setTrips] = useState([]); // UseState 2
  const [trip, setTrip] = useState(); // useState 3
  const [senderId, setSenderId] = useState(1); // default sender ID // useState 4
  const [groupId, setGroupId] = useState(1); // default group ID // useState 5
  const [users, setUsers] = useState([]); // useState 6
  const [itineraries, setItineraries] = useState([]); // useState 7
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 8
  const [error, setError] = useState(""); // useState9
  
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchTrips();
    fetchItineraries();
    //setLoading(false);
  }, []);

  //  if there is userid in local storage,
  useEffect(() => {
    let x = Local.getUserId();
    if (x) {
      let y = Api.getUser(x).then((y) => setUser(y.data));
    }
  }, []);

  // log in
  async function doLogin(username, password) {
    // console.log(user);
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      let user = await Api.getUser(myresponse.data.user.id);
      setUser(user.data);
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

  async function fetchUsers() {
    let myresponse = await Api.getUsers();
    if (myresponse.ok) {
      setUsers(myresponse.data);
    } else {
      console.log("response not ok");
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
  // get trip by id
  async function getTrip(id) {
    let myresponse = await Api.getTrip(id);
    if (myresponse.ok) {
      setTrip(myresponse.data);
      //optional: navigate to trip/id page after
      navigate(`/my-trips/${id}`);
    } else {
      setError(myresponse.error);
    }
  }

  //gets all the trips
  async function fetchTrips() {
    let myresponse = await Api.getTrips();
    if (myresponse.ok) {
      setTrips(myresponse.data);
    } else {
      console.log("response not ok");
    }
  }

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

  async function getTrip(id) {
    let myresponse = await Api.getTrip(id);
    if (myresponse.ok) {
      setTrip(myresponse.data);
      //optional: navigate to trip/id page after
      navigate(`/my-trips/${id}`);
    } else {
      setError(myresponse.error);
    }
  }
  // get all form itineraries
  async function fetchItineraries() {
    let myresponse = await Api.getItineraries();
    if (myresponse.ok) {
      setItineraries(myresponse.data);
    } else {
      console.log("response not ok");
    }
  }

  // navitates to the map of selected trip. Function is called from trip by id view.
  function goToMapsView(id) {
    navigate(`/my-trips/${id}/maps?destination=${trip.destination}`);
  }

  const contextObjTrips = {
    trip,
    trips,
    addTrip,
    getTrip,
    setTrip,
    itineraries,
    goToMapsView,
    fetchItineraries,
  };

  const contextObjUser = {
    user,
    doLogout,
    editUser,
  };

  if (trips.length === 0 || itineraries.length === 0 || users.length === 0) {
    return <h2>"...Loading"</h2>;
  }
  return (
    <div className="App">
      <UserContext.Provider value={contextObjUser}>
        <NavBar />

        <TripsContext.Provider value={contextObjTrips}>
          <Routes>
            <Route path="/" element={<HomeView />} />
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
              path="chat/:groupId"
              element={
                <ChatView
                  senderId={senderId}
                  setSenderIdCb={setSenderId}
                  groupId={groupId}
                  setGroupIdCb={setGroupId}
                  user={user}
                  users={users}
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
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <MyProfileView />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-trips/:id/maps"
              element={
                <PrivateRoute>
                  <MapsView />
                </PrivateRoute>
              }
            />

            <Route path="/my-trips/:id" element={<TripByIdView />} />
            <Route path="/itinerary" element={<ItineraryView />} />
            <Route path="/lists" element={<ListsView />} />

          </Routes>
        </TripsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
