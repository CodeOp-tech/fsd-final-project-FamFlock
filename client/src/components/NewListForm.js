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
    <div className="NewListForm" onSubmit={handleSubmit}>
      <form>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          isComplete
          <input
            name="isComplete"
            type="checkbox"
            value={formData.isComplete}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add List</button>
      </form>
    </div>
  );
}

export default NewListForm;
