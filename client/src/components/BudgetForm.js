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
    <div>
      <h1>Keep track of your trip expenses </h1>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name of the expense:
            <input type="text" name="name" onChange={handleChange} />
          </label>
          <br></br>
          <label>
            Amount:
            <input type="text" name="amount" onChange={handleChange} />
          </label>
          <br></br>
          <label>
            <button>Search</button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm;
