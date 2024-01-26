import React, { useState, useEffect } from 'react';
import logo from '../Images/logo.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [tableData, setTableData] = useState([]);

  const userCount = 150; // Replace with the actual count of users
  const bookingCount = 300; // Replace with the actual count of bookings

  const toggleContent = (section) => {
    setCurrentContent(section);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/admindashboard') // Assuming your API endpoint for venues is '/venues'
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching table data:', error);
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="sidebar">
        <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto', position: 'absolute', top: '20px', left: '20px' }} /><br /><br />
        <nav>
          <ul>
            <li onClick={() => toggleContent('dashboard')}>Dashboard</li>
            <li>
              <Link to="/managevenues">Manage Venues</Link>
            </li>
            <li>
              <Link to="/manageusers">Manage Client</Link>
            </li>
            <li onClick={() => toggleContent('orders')}>Messages</li>
            <li onClick={() => toggleContent('booking')}>Booking details</li>
            <li onClick={() => toggleContent('review')}>Review</li>
            <li><a href="">Logout</a></li>
          </ul>
        </nav>
      </div>

      <div className="content">
        {currentContent === 'dashboard' && (
          <div>
            <h1>Dashboard</h1>
            <div className="card-container">
              <div className="card">
                <h3>User Count</h3>
                <p>{userCount}</p>
              </div>
              <div className="card">
                <h3>Booking Count</h3>
                <p>{bookingCount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
