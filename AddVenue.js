import React, { useState } from 'react';
import axios from 'axios';
import './AddVenue.css';

const AddVenue = () => {
  const [venueData, setVenueData] = useState({
    name: '',
    location: '',
    img: '', // Updated img to store URL
    contact: '',
    price: '',
    details: '',
    type:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const imageURL = e.target.value;
    setVenueData({
      ...venueData,
      img: imageURL
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:7060/addvenue', venueData);
  
      if (response.status === 201) {
        alert('Venue added successfully!');
        setVenueData({
          name: '',
          details: '',
          price: '',
          contact: '',
          location: '',
          img: '',
          type:''
        });
  
        // Redirect to the manage venues page
        window.location.href = '/managevenues';
      }
    } catch (error) {
      console.error('Error adding venue:', error);
      alert('An error occurred while adding the venue.');
    }
  };
  
  return (
    <div className="container">
      <form className="venue-form1" onSubmit={handleSubmit}>
        <h2 className="header-title">Add Venue</h2>
        <label>
          Name:
          <input type="text" name="name" value={venueData.name} onChange={handleChange} />
        </label>
        <label>
          Details:
          <input type="text" name="details" value={venueData.details} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={venueData.price} onChange={handleChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={venueData.location} onChange={handleChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={venueData.contact} onChange={handleChange} />
        </label>
        <label>
  Type:
  <select name="type" value={venueData.type} onChange={handleChange}>
    <option value="">Select Type</option>
    <option value="Beachfront">Beachfront</option>
    <option value="Backwaters">Backwaters</option>
    <option value="Resort">Resort</option>
    <option value="Hill Range">Hill Range</option>
    <option value="Nature">Nature</option>
  </select>
</label>

        <label>
          Image URL:
          <input type="text" name="image" value={venueData.img} onChange={handleImageChange} />
        </label>
        <button type="submit">Add Venue</button>
      </form>
    </div>
  );
};

export default AddVenue;
