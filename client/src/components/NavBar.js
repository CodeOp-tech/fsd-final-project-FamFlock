import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.scss";
import UserContext from "../context/UserContext";
// function to show the navbar, will need the user prop at some point
function NavBar(props) {
  const { user, doLogout } = useContext(UserContext);
  return (
    <nav className="NavBar">
      <ul>
        {user ? (
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
              <Link to="/" onClick={doLogout}>
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
