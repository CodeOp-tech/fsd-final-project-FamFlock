import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MyProfileView from "./views/MyProfileView";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

function App() {
  const [user, setUser] = useState(Local.getUser()); // useState 1
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/profile/:id" element={<MyProfileView user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
