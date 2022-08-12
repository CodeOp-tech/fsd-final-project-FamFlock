import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import TripsView from "./views/TripsView";
import RegisterView from "./views/RegisterView";
import MyProfileView from "./views/MyProfileView";
import TripByIdNav from "./components/TripByIdNav";
import ListsView from "./views/ListsView";
import ListItemsView from "./views/ListItemsView";
import Local from "./helpers/Local";
import ChatView from "./views/ChatView";
import Api from "./helpers/Api";
import PrivateRoute from "./components/PrivateRoute";
import YelpView from "./views/YelpView";
import ItineraryView from "./views/ItineraryView";
import MapsView from "./views/MapsView";
import TripsContext from "./context/TripsContext";
import UserContext from "./context/UserContext";
import AddTripPopUp from "./components/AddTripPopUp";
import MembersView from "./views/MembersView";
import YelpAnonyMousView from "./views/YelpAnonymousView";
import BudgetForm from "./components/BudgetForm";

function App() {
  const [user, setUser] = useState(null); // useState 1: sets logged in user
  const [trips, setTrips] = useState([]); // UseState 2
  const [trip, setTrip] = useState(); // useState 3
  const [senderId, setSenderId] = useState(0); // default sender ID // useState 4
  const [groupId, setGroupId] = useState(0); // default group ID // useState 5
  const [users, setUsers] = useState([]); // useState 6
  const [itineraries, setItineraries] = useState([]); // useState 7
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 8
  const [error, setError] = useState(""); // useState9
  const [tripAddresses, setTripAddresses] = useState([]); // useState 10;
  const [usersInTrip, setUsersInTrip] = useState([]); // useState 11
  const [budget, setBudget] = useState([]); // useState 12

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
      await doLogin(username, password);
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
      setGroupId(myresponse.data.id);
      fetchUsersInTrip(myresponse.data.id);
      console.log(myresponse.data.id);
      //optional: navigate to trip/id page after
      navigate(`/my-trip/${id}/info`);
    } else {
      setError(myresponse.error);
    }
  }

  // get users in a trip
  async function fetchUsersInTrip(id) {
    let myresponse = await Api.getUsersInTrip(id);
    if (myresponse.ok) {
      setUsersInTrip(myresponse.data);
    } else {
      console.log("response not ok");
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
      setError(myresponse.error);
    }
  }

  // add new trip member
  async function addMember(email, id) {
    let myresponse = await Api.addMember({ email }, id);
    if (myresponse.ok) {
      fetchUsersInTrip(id);
    } else {
      console.log("response not ok");
      setError(myresponse.error);
    }
  }

  // remove a trip member
  async function removeMember(userId, tripId) {
    let myresponse = await Api.removeMember(userId, { tripId });
    if (myresponse.ok) {
      fetchUsersInTrip(tripId);
    } else {
      console.log("response not ok");
      setError(myresponse.error);
    }
  }

  // add a trip
  const addTrip = async (trip) => {
    trip.user_id = user.id;
    let myresponse = await Api.addTrip(trip);
    if (myresponse.ok) {
      setUser((state) => ({
        ...state, // gets replaced by all key-value pairs from obj
        trips: myresponse.data, // sets updated trips from this user
      }));
    } else {
      setError(myresponse.error);
    }
  };

  // get all from itineraries
  async function fetchItineraries() {
    let myresponse = await Api.getItineraries();
    if (myresponse.ok) {
      setItineraries(myresponse.data);
    } else {
      console.log("response not ok");
    }
  }

  // add new item to itinerary
  async function addToItinerary(newActivity) {
    let myresponse = await Api.addToItinerary(newActivity);
    if (myresponse.ok) {
      setItineraries(myresponse.data);
      // setting the itinerary, but doing his through the itinerary array in the trip object
      setTrip((state) => ({
        ...state,
        itinerary: myresponse.data,
      }));
    } else {
      setError(myresponse.error);
    }
  }

  // edits itinerary item, currently only works on date - enables drag n drop
  async function editItineraryActivity(date, activityid) {
    let body = { date, FK_trips_id: trip.id };
    await Api.editItineraryActivity(body, activityid);
    let myresponse = await Api.getTrip(trip.id);
    setTrip(myresponse.data);
  }

  // navitates to the map of selected trip. Function is called from trip by id view.
  function goToMapsView(id) {
    navigate(`/my-trips/${id}/maps?destination=${trip.destination}`);
  }

  // navigates to itinerary for selected trip
  function goToItineraryView(id) {
    navigate(`/my-trips/${id}/itinerary`);
  }

  // navigates to chat for selected tri
  function goToChatView(id) {
    navigate(`/my-trips/${id}/chat`);
  }

  function goToListView(id) {
    navigate(`/lists`);
  }

  function goToMembersView(id) {
    navigate(`/my-trip/${id}/info`);
  }

  function goToYelpView(id) {
    navigate(`/my-trips/${id}/yelp-search`);
  }

  function goToRegister() {
    navigate(`/register`);
  }

  function goToLogin() {
    navigate(`/login`);
  }

  function goToMyProfile(id) {
    navigate(`/profile/${id}`);
  }
  //it gets the additional addresses the user has saved to the trip
  async function loadTripAddresses(id) {
    let myresponse = await Api.getTripAddress(id);
    if (myresponse.ok) {
      setTripAddresses(myresponse.data);
    } else {
      console.log("function load trip on App", myresponse);
      setError(myresponse.error);
    }
  }

  // it adds a new address to the trip that is not part of the itinerary
  async function addNewTripAddress(address) {
    let myresponse = await Api.newTripAddress(address);
    if (myresponse.ok) {
      setTripAddresses(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }
  //deletes an added address to the trip
  async function deleteTripAddress(id) {
    console.log(id);
    let myresponse = await Api.deleteTripAddress(id);
    if (myresponse.ok) {
      // setTripAddresses(myresponse.data);
      loadTripAddresses(trip.id);
    } else {
      setError(myresponse.error);
    }
  }
  // adds expenses to the trips budget
  async function addToBudget(expense) {
    expense.FK_trips_id = trip.id;
    console.log(expense);
    let myresponse = await Api.addToBudget(expense);
    if (myresponse.ok) {
      setBudget(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  //it gets the additional addresses the user has saved to the trip
  async function loadTripBudget(id) {
    let myresponse = await Api.getTripBudget(id);
    if (myresponse.ok) {
      setBudget(myresponse.data.data);
    } else {
      setError(myresponse.error);
    }
  }

  //deletes an added expense of the trip
  async function deleteExpense(id) {
    console.log("this is the expense to delete in APP", id);
    let myresponse = await Api.deleteExpenseFromBudget(id);
    if (myresponse.ok) {
      loadTripBudget(trip.id);
    } else {
      setError(myresponse.error);
    }
  }

  // deletes activity from itinerary
  async function deleteItineraryActivity(activityid) {
    let myresponse = await Api.deleteItineraryActivity(activityid);

    if (myresponse.ok) {
      let updated = await Api.getTrip(trip.id);
      setTrip(updated.data);
    } else {
      setError(myresponse.error);
    }
  }

  /*******Context Objects****** */

  const contextObjTrips = {
    trip,
    addTrip,
    getTrip,
    setTrip,
    itineraries,
    goToMapsView,
    goToItineraryView,
    editItineraryActivity,
    deleteItineraryActivity,
    fetchItineraries,
    addNewTripAddress,
    tripAddresses,
    deleteTripAddress,
    loadTripAddresses,
    goToChatView,
    goToListView,
    goToMembersView,
    goToYelpView,
    addToItinerary,
    addToBudget,
    budget,
    loadTripBudget,
    usersInTrip,
    deleteExpense,
  };

  const contextObjUser = {
    user,
    doLogout,
    editUser,
    addTrip,
    goToRegister,
    goToLogin,
    goToMyProfile,
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
            <Route path="/search" element={<YelpAnonyMousView />} />

            <Route
              path="/register"
              element={<RegisterView registerCb={register} />}
            />
            <Route
              path="/my-trips/:id/chat"
              element={
                <ChatView
                  senderId={senderId}
                  setSenderIdCb={setSenderId}
                  groupId={groupId}
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

            <Route
              path="my-trips/:id/yelp-search"
              element={
                <PrivateRoute>
                  <YelpView />
                </PrivateRoute>
              }
            />

            <Route
              path="/my-trips/:id"
              element={<TripByIdNav user={user} groupId={groupId} />}
            />

            <Route
              path="/my-trips/:id/itinerary"
              element={<ItineraryView addToItinerary={addToItinerary} />}
            />

            <Route path="/lists" element={<ListsView />} />

            <Route
              path="/my-trip/:id/info"
              element={
                <MembersView
                  usersInTrip={usersInTrip}
                  addMemberCb={addMember}
                  removeMemberCb={removeMember}
                  user={user}
                />
              }
            />
            <Route path="/my-trip/:id/lists" element={<ListItemsView />} />
          </Routes>
        </TripsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
