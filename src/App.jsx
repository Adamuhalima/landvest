import { useState } from 'react'
import reactLogo from './assets/react.svg'
import React from 'react'
import './App.css'
import Navbar from './components/navbar'

//import {Link} from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/home'

function App() {
  return (<>
  <BrowserRouter>
    <Navbar/>
     <Router>
      <Routes>
       
        <Route path='./pages/Home.jsx' element={<h1>Home</h1>} />
         <Route path='./pages/Contact.jsx' element={<h1>Contact</h1>} />
       
      </Routes>
   </Router> 

    <Home />
 
    </BrowserRouter>
   </>
  )}
export default App
