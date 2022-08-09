import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import UserContext from "../context/UserContext";
// function to show the navbar, will need the user prop at some point
function NavBar(props) {
  const { user, doLogout, goToMyProfile } = useContext(UserContext);
  const navigate = useNavigate();

  function goToMytrips() {
    navigate("/my-trips");
  }

  return (
    <nav className="NavBar">
      <div>
        <ul>
          <div class="logo-image">
            <img
              src="/famflock-white.png"
              class="img-fluid"
              onClick={goToMytrips}
            />
          </div>
          {user ? (
            <>
              {/* only if user exists */}
              <li>
                <NavLink to="/my-trips">My Trips</NavLink>
              </li>
              <li>
                {/* placeholder for ${id} once its actually defined */}
                <p onClick={() => goToMyProfile(user.id)}>My Profile</p>
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
      </div>
    </nav>
  );
}

export default NavBar;
