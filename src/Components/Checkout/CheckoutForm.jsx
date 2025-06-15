import React, { useState } from 'react';

const CheckoutForm = ({ handleSubmit }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(userDetails);
  };

  return (
    <form onSubmit={submitForm} className="checkout-form">
      <div>
        <h1>Input Your Details</h1>
        <label>Name:</label>
        <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={userDetails.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={userDetails.address} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" name="phone" value={userDetails.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={userDetails.city} onChange={handleChange} required />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="state" value={userDetails.state} onChange={handleChange} required />
      </div>
      <div>
        <label>Postal Code:</label>
        <input type="text" name="postalCode" value={userDetails.postalCode} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckoutForm;
