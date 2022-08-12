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
      <form className="form-group">
        <div className="row">
          {/* <div className="col"> </div> */}
          <input
            className="col form-control mt-3"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="ex ... Hotel reservations "
          />
          <button
            className="col col-md-2 btn btn-primary shadow "
            type="submit"
          >
            Add List
          </button>
          {/* <div className="col "> </div> */}
        </div>
      </form>
    </div>
  );
}

export default NewListForm;
