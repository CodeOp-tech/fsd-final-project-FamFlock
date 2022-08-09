import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import TripsContext from "../context/TripsContext.js";

function BudgetTable(props) {
  const [total, setTotal] = useState(null);
  const { trip, budget, loadTripBudget, usersInTrip, deleteExpense } =
    useContext(TripsContext);

  useEffect(() => {
    if (trip) {
      loadTripBudget(trip.id);
    }
  }, [trip]);

  useEffect(() => {
    calculateTotal();
  }, [budget]);

  const calculateTotal = () => {
    let result = 0;
    const ids =
      budget.length > 0 && budget.map((b) => (result += Number(b.amount)));
    setTotal(Number(result));
  };

  return (
    <div className="tripById paddingbottom">
      <div className="container">
        <table className="table table-bordered padding">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {budget &&
              budget.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.amount}</td>
                  <td>
                    <button
                      onClick={() => deleteExpense(p.id)}
                      className="btn btn-primary shadow"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            <tr>
              <th>Total</th>
              <th>{total}€</th>
              <th></th>
            </tr>
            <tr>
              <th>Total per member</th>
              <th>{(total / usersInTrip.length).toFixed(2)}€</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BudgetTable;
