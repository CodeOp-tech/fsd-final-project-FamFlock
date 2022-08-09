import React, { useContext } from "react";
import "./HomeView.scss";
import UserContext from "../context/UserContext";

function HomeView() {
  const { goToLogin } = useContext(UserContext);
  return (
    <div className="home-view">
      <div className="home-header">
        <img src="/famflock-w-slogan-white.png" width="400" height="400" />
      </div>

      {/* slider container */}
      <div className="container">
        <div
          id="carouselExampleInterval"
          className="carousel carousel-dark slide container"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="1000">
              <img
                src="/HomeViewImages/MyTripsView.png"
                width="300"
                className="d-block w-100"
                alt="tbc"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-text">
                  Plan trips for your group, to any destination!
                </h3>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/HomeViewImages/MapView.png"
                width="300"
                className="d-block w-100"
                alt="tbc"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-text">
                  Use a personalized map to track your group's itinerary.
                </h3>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/HomeViewImages/ChatView.png"
                width="300"
                className="d-block w-100"
                alt="tbc"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-text">
                  Chat with group members and vote, to make important decisions!
                </h3>
              </div>
            </div>
            <div className="carousel-item ">
              <img
                src="/HomeViewImages/YelpResultsView.png"
                width="300"
                className="d-block w-100"
                alt="tbc"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-text">
                  Search over 200 destinations for group-friendly activities!
                </h3>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/HomeViewImages/ItineraryView.png"
                width="300"
                className="d-block w-100"
                alt="tbc"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-text">
                  Plan out your trip day by day!
                </h3>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/*Link to login or register */}
      <div className="container">
        <h4>
          <a className="home-login-text" href="/login">
            Log in or Register to continue!
          </a>
        </h4>
      </div>
      {/* Grid with destinations */}
      <div className="container">
        <h2 className="text-start">Our users have planned trips to:</h2>
        <div className="home-grid ">
          <div className="">
            <img
              className="home-grid-image "
              src="/HomeViewImages/Barcelona.jpg"
              alt="Sagrada Familia in Barcelona from pexels.com"
            />
            <div className="centered-text-grid">
              <h4>Barcelona </h4>
            </div>
          </div>
          <div className="">
            <img
              className="home-grid-image"
              src="/HomeViewImages/Venice.jpg"
              alt=" Venice from pexels.com"
            />
            <div className="centered-text-grid">
              <h4>Venice </h4>
            </div>
          </div>
          <div className="">
            <img
              className="home-grid-image"
              src="/HomeViewImages/London.jpg"
              alt=" London Bridge from pexels.com"
            />
            <div className="centered-text-grid">
              <h4>London </h4>
            </div>
          </div>
          <div className="">
            <img
              className="home-grid-image"
              src="/HomeViewImages/Paris.jpg"
              alt=" Paris from pexels.com"
            />
            <div className="centered-text-grid">
              <h4>Paris </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
