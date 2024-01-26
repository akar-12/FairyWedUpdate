// ManageClients.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [tableData, setClientData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7060/manageusers')
      .then((response) => {
        setClientData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  }, []);

  const handleDelete = (userId) => {
    console.log('Deleting user with ID:', userId);
  
    axios.delete(`http://localhost:7060/manageusers/${userId}`)
      .then(() => {
        console.log('User deleted successfully');
        // After successful deletion, update the table data
        setClientData((prevData) => prevData.filter(user => user._id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  

  return (
    <div>
      <h1>Manage Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
