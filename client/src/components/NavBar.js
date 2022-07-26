import React from "react";
import { NavLink, Link } from "react-router-dom";

// function to show the navbar, will need the user prop at some point
function NavBar(props) {
  return (
    <nav className="NavBar">
      <ul>
        {props.user ? (
          <>
            {/* only if user exists */}
            <li>
              <NavLink to="/my-trips">My Trips</NavLink>
            </li>
            <li>
              {/* placeholder for ${id} once its actually defined */}
              <NavLink to={`/profile/1`}>My Profile</NavLink>
            </li>
            <li>
              <NavLink to="/yelp-search">Yelp Search</NavLink>
            </li>
            <li>
              <Link to="/" onClick={props.logoutCb}>
                Logout
              </Link>
            </li>
            {/* only if user exists */}
          </>
        ) : (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
