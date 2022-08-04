import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import TripsContext from "../context/TripsContext";
import "./BasicInfo.css";

const BasicInfo = () => {
  const { user } = useContext(UserContext);
  const { trip } = useContext(TripsContext);
  const [diffInDays, setDiffInDays] = useState();
  //   const [data, setData] = useState();
  //   console.log("this is trips from Basic Info component " + trip);

  useEffect(() => {
    daysLeft();
  }, [trip]);

  const daysLeft = () => {
    const startDate = new Date().toISOString().slice(0, 10);
    const endDate = trip.startDate;
    const diffInMs = new Date(endDate) - new Date(startDate);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    setDiffInDays(Math.floor(diffInDays));
  };

  // console.log(today);

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

  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;
  // console.log(date);

  //   alert(diffInDays);

  return (
    <div>
      <div className="basic-info">
        <div className="basic-info-info">
          <h2>Hello, {user.fullname}</h2>
          <h4>This is your trip to: {trip.destination}</h4>
          <center>
            <div class="today-card border-light mb-3">
              <div class="card-header">
                <h4>Today is</h4>
              </div>

              <h6>{day}</h6>
              <h6>{month}</h6>
              <h6>{date} </h6>
              <h6>{year}</h6>
            </div>
          </center>
          <h4>You have {diffInDays} days are before your Trip starts!</h4>
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
