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

const Navbar = () => { 
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
  <Link to="/">Home</Link>
  <Link to="/properties">Properties</Link>
  <Link to="/invest">Invest</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/about">About</Link>
</nav>

        {/* Desktop CTA */}
        <button className="nav-cta desktop-only">
          <Link to="/landing" className="nav-cta desktop-only">
          Get Started </Link>
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
