import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import Navbar from './components/navbar'
//import {Link} from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (<>
    {/* <Router>
      <Routes>
       
        <Route path='./navbar.jsx' element={<h1>Home</h1>} />
       <Navbar/>
      </Routes>
   </Router> */}

    <Navbar/>
   </>
  )}
export default App
