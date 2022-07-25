import React from "react";
import { NavLink } from "react-router-dom";

// function to show the navbar, will need the user prop at some point
function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {/* only if user exists */}
        <li>
          <NavLink to="/my-trips">My Trips</NavLink>
        </li>
        <li>
          {/* placeholder for ${id} once its actually defined */}
          <NavLink to={`/profile/id`}>My Profile</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        {/* only if user exists */}
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
