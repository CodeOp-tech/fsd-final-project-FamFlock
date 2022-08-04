import React, { useState, useContext } from "react";

const emptyForm = { address: "", addressName: "" };
function AddressForm(props) {
  const [newAddress, setNewAddress] = useState(emptyForm);

  function handleChange(event) {
    let { name, value } = event.target;
    setNewAddress((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.addMarkerCb(newAddress);

    // addNewTripAddress(newAddress, FK_trips_id);
    setNewAddress(emptyForm);
  }

  return (
    <div className="AddressForm container">
      <h2 className="text-start">Add new addresses</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="w-100 col-form-label-lg">
            Address
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={handleChange}
              required
            />
          </label>
          <label className="w-100 col-form-label-lg">
            Address Name
            <input
              type="text"
              className="form-control"
              name="addressName"
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary d-block">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
