import React, { useState } from "react";

const EMPTY_FORM = { name: "", isComplete: 0 };
function NewListForm(props) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  function handleChange(event) {
    let { name, value } = event.target;

    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.addListCb(formData);
    setFormData(EMPTY_FORM);
  }

  return (
    <div className="new-list-form" onSubmit={handleSubmit}>
      <form className="form-row align-items-center">
        <div>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Add a New List"
          />
        </div>
        <br />
        <label>
          Mark as Complete
          <input
            name="isComplete"
            type="checkbox"
            value={formData.isComplete}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="btn btn-primary" type="submit">
          Add List
        </button>
      </form>
    </div>
  );
}

export default NewListForm;
