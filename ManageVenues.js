// ManageVenues.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageVenues() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7060/managevenues')
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching venue data:', error);
      });
  }, []);

  const handleAddVenue = () => {
    // Implement logic to open a modal or navigate to the add venue page
    console.log('Add Venue button clicked');
  };

  const handleDeleteVenue = async (venueId) => {
    // Implement logic to delete the venue with the given ID
    console.log(`Delete Venue button clicked for ID: ${venueId}`);
  
    try {
      const response = await axios.delete(`http://localhost:7060/deletevenue/${venueId}`);
      if (response.status === 200) {
        // Update the table data after successful deletion
        const updatedData = tableData.filter((venue) => venue._id !== venueId);
        setTableData(updatedData);
      }
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  // Add this function to handle navigation to the update venue page
  const handleUpdateVenue = (venueId) => {
   
    console.log(`Update Venue button clicked for ID: ${venueId}`);
   
  };

  return (
    <div>
      <h1>Manage Venues</h1>
      <Link to="/addvenue">
        <button>Add Venue</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Venue Name</th>
            <th>Location</th>
            <th>Image</th>
            <th>Contact</th>
            <th>Price</th>
            <th>Details</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((venue) => (
            <tr key={venue._id}>
              <td>{venue.name}</td>
              <td>{venue.location}</td>
              <td>
                <img
                  src={`data:image/png;base64,${venue.img.toString('base64')}`}
                  alt="Venue"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </td>
              <td>{venue.contact}</td>
              <td>{venue.price}</td>
              <td>{venue.details}</td>
              <td>{venue.type}</td>
              <td>
                <button onClick={() => handleDeleteVenue(venue._id)}>Delete</button>
              
              <Link to={`/updatevenue/${venue._id}`}>Update</Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageVenues;
