// UpdateVenue.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './updatevenue.css';

function UpdateVenue() {
  const [venueData, setVenueData] = useState({
    name: '',
    location: '',
    img: '',
    contact: '',
    price: '',
    details: '',
    type: '',
  });
  const [loading, setLoading] = useState(true); // New loading state

  const { venueId } = useParams(); // Get the venueId from the URL parameters

  useEffect(() => {
    console.log('Venue ID:', venueId);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3020/managevenues/${venueId}`);
        console.log('Venue Data:', response.data);
        setVenueData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    };
    fetchData();
  }, [venueId]);
  
  
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3020/updatevenue/${venueId}`, { ...venueData, venueId });
      if (response.status === 200) {
        console.log('Venue updated successfully');
        // Implement any logic after a successful update
      }
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };
  
  const handleChange = (e) => {
    setVenueData({
      ...venueData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Venue</h1>
      <form>
        <label>Venue Name:</label>
        <input type="text" name="name" value={venueData.name} onChange={handleChange} />

        {/* Repeat similar input fields for other venue properties */}
        <label>Location:</label>
        <input type="text" name="location" value={venueData.location} onChange={handleChange} />

        <label>Image:</label>
        <input type="text" name="img" value={venueData.img} onChange={handleChange} />

        <label>Contact:</label>
        <input type="text" name="contact" value={venueData.contact} onChange={handleChange} />

        <label>Price:</label>
        <input type="text" name="price" value={venueData.price} onChange={handleChange} />

        <label>Details:</label>
        <input type="text" name="details" value={venueData.details} onChange={handleChange} />

        <label>Type:</label>
        <input type="text" name="type" value={venueData.type} onChange={handleChange} />
        
        <button type="button" onClick={handleUpdate}>Update Venue</button>
      </form>
    </div>
  );
}

export default UpdateVenue;
