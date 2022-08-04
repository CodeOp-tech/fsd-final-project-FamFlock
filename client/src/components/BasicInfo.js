import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import "./BasicInfo.css";

const BasicInfo = () => {
  const { user } = useContext(UserContext);
  const { trip } = useContext(TripsContext);
  //   const [data, setData] = useState();
  //   console.log("this is trips from Basic Info component " + trip);

  // const diffInMs = new Date(endDate) - newDate(startDate);
  // const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  // return diffInDays;

  const daysLeft = (startDate, today) => {
    // let today = new Date().toISOString().slice(0, 10);
    // const startDate = today;
    // const endDate = trip.startDate;
  };

  const d = new Date();
  const weekDay = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = weekDay[d.getDay()];
  const month = months[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();

  //   alert(diffInDays);

  return (
    <div>
      <div className="basic-info">
        <div className="top">
          <h4>Hello {user.fullname}, take a look at your trip info</h4>
          {/* <img src={birdsPic} /> */}
          <div className="trip-info-display">
            <h3>This is Your Trip to {trip.destination}</h3>
            <div className="main">
              <div className="date">
                <h4>Today is</h4>
                <h3>{day}</h3>
                <h3>{month}</h3>
                <h3>{date} </h3>
                <h3>{year}</h3>
                <h2>You have [diffInDays] days are before your Trip starts!</h2>
              </div>
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
