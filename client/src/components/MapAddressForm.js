import React, { useState } from 'react';


function AddressForm(props) {
    const [address, setAddress] = useState('');

    function handleChange(event) {
        setAddress(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addMarkerCb(address);
        setAddress('');
    }

    return (
        <div className="AddressForm">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="w-100">Address
                        <input 
                            type="text" 
                            className="form-control" 
                            name="address"
                            value={address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    
                    <button type="submit" className="btn btn-primary d-block">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;