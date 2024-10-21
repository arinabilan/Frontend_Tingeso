import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MainLayout from './components/MainLoyout';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Simulate from './components/Simulate';

function App() {
  return (
    <Router>
      <div className = "container">
        
          <Routes>
            <Route path = "/home" element = {<Home/>}>
            </Route>
            <Route path = "/" element = {<MainLayout/>}></Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/register' element = {<Register/>}></Route>
            <Route path='profile' element = {<Profile/>}></Route>
            <Route path='simulateloan' element = {<Simulate/>}></Route>
          </Routes>
        
      </div>
    </Router>
  )
}

export default App;