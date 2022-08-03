import React, { useState, useContext } from "react";
import { useEffect } from "react";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";
import TripsContext from "../context/TripsContext";
import "./MembersView.css";
import BudgetForm from "../components/BudgetForm";
import BudgetTable from "../components/BudgetTable";

function MembersView(props) {
  const { trip, budget } = useContext(TripsContext);
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.addMemberCb(email, trip.id);
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setEmail(value);
  }

  function handleClick() {
    props.removeMemberCb(props.user, trip.id);
  }

  return (
    <div>
      <TripByIdNav />
      <div className="tripById">
        <h2>Trip Members</h2>
        {props.usersInTrip.map((u) => (
          <div className="members">
            {u.fullname ? (
              <div className="row">
                <div className="col">Email: {u.email}</div>
                <div className="col">Name: {u.fullname}</div>
                <div className="col">Username: {u.username}</div>
                <button className="col col-md-1" onClick={handleClick}>
                  Remove
                </button>
              </div>
            ) : (
              <div className="row">
                <div className="col">Email: {u.email}</div>
                <button className="col col-md-1" onClick={handleClick}>
                  Remove
                </button>
              </div>
            )}
            <hr />
          </div>
        ))}

        <h4>Add new members</h4>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" required onChange={handleChange} />
          <button>ADD</button>
        </form>
      </div>
      <div>
        <div>
          <BudgetForm></BudgetForm>
        </div>
        <div>{budget.length > 0 ? <BudgetTable></BudgetTable> : null}</div>
      </div>
    </div>
  );
}

export default MembersView;
