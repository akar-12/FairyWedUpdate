import React from 'react';

import Home from './Components/Home';
import Login from './Components/LoginForm';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import MainPage from './Components/MainPage';
import Beachfront from './Components/Beachfront';
import AdminDashboard from './Components/AdminDashboard';
import AddVenue from './Components/AddVenue';
import ManageVenues from './Components/ManageVenues';
import ManageUsers from './Components/ManageUsers';
import UpdateVenue from './Components/UpdateVenue';


const App = () => {
  return (
    <Router>
      <Routes> 
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/about' element={<AboutUs/>}/>
        <Route exact path='/contact' element={<ContactUs/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<RegistrationForm/>} />
        <Route path='/mainpage' element={<MainPage/>}/>
        <Route path='/beachfront' element={<Beachfront/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/addvenue' element={<AddVenue/>}/>
        <Route path="/managevenues" element={<ManageVenues />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/updatevenue/:venueId" component={<UpdateVenue/>} />
      </Routes>
    </Router>
  );
};

export default App;