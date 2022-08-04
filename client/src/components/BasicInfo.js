import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import "./BasicInfo.css";
import birds from "../images/birds.jpeg";

// const birdsPic = new URL("../images/birds.jpeg", import.meta.url);

const BasicInfo = () => {
  const { user } = useContext(UserContext);
  const { trip } = useContext(TripsContext);
  //   const [data, setData] = useState()

  //   console.log("this is trips from Basic Info component " + trip);

  // get current date
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  // const diffInMs = new Date(endDate) - newDate(startDate);
  // const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  // return diffInDays;

  const daysLeft = (startDate, today) => {
    // let today = new Date().toISOString().slice(0, 10);
    // const startDate = today;
    // const endDate = trip.startDate;
  };

  //   alert(diffInDays);

  return (
    <div>
      <div className="basic-info">
        <div className="top">
          <h4>Hello {user.fullname}, take a look at your trip info</h4>
          {/* <img src={birdsPic} /> */}
          <div className="trip-info-display">
            <h3>This is Your Trip to {trip.destination}</h3>
            <div>
              <h4>{/* Today is {data} | [{diffInDays}] days are left! */}</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Description about ??? */}
      {/* Remember to visit TripByIdNav PopUp */}
      {/* <h2>This are the members joining this journey with you</h2> */}
      <div className="members-display">
        {/* <strong>[groups].map cards here</strong> */}
        {/* Info from MyProfile */}
      </div>
    </div>
  );
};

export default BasicInfo;
