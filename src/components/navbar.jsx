// import react, { useState } from "react";
// import './Navbar.css'



// function Navbar() {
//   return (
//     <>

//    <nav className="navbar">
//     <div className="navbar-container">
//       <link to="/" className="navbar-logo"> <h1>Adamz</h1> 
//       </link>
//     </div>
//     <div>
//       <ul>
//         <li>Home</li>
//         <li>Home</li>
//         <li>Home</li>
//         <li>Home</li>
//         <li>Home</li>
//       </ul>
//       </div>
//    </nav>
//     </>
//   )
// }

// export default Navbar


import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {  ` QA`
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <span>LandVest</span>
        </div>

        {/* Desktop Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
         <link to="/pages/Contact"></link> {/* <a href="/">Home</a> */}
          <a href="/properties">Properties</a>
          <a href="/invest">Invest</a>
          <a href="./pages/Contact">Contact</a>
          <button className="nav-cta mobile-only" onClick={ ()=>{}}>
            Get Started
          </button>
        </nav>

        {/* Desktop CTA */}
        <button className="nav-cta desktop-only">
          Get Started
        </button>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
