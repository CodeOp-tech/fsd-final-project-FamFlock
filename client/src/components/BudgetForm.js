import React, { useState, useContext } from "react";
import TripsContext from "../context/TripsContext.js";

const EMPTY_FORM = {};

function BudgetForm(props) {
  const [formData, setFormData] = useState(EMPTY_FORM); // Usestate 1
  const { addToBudget } = useContext(TripsContext);

  function handleChange(event) {
    let { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    const expense = { ...formData };
    addToBudget(expense);
    setFormData(EMPTY_FORM);
  }
  return (
    <div className="tripById padding">
      <h2 className="heading">Expense Calculator</h2>

      <div>
        <form onSubmit={handleSubmit} className="row">
          <div className="col">
            <label>Name of the expense: </label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Amount:</label>
            <input
              className="form-control"
              type="text"
              name="amount"
              onChange={handleChange}
              placeholder="€"
            />
          </div>
          <button className="btn btn-primary col col-md-1">Add</button>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm;
