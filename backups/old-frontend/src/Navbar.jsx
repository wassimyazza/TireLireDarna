import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../assets/css/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          TireLire & Darna
        </Link>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/dashboard" className="navbar-link">
            Dashboard
          </NavLink>
          <NavLink to="/darna" className="navbar-link">
            Darna APIs
          </NavLink>
          <NavLink to="/tirelire" className="navbar-link">
            Tirelire APIs
          </NavLink>

          <div className="navbar-actions">
            <Link to="/login" className="navbar-login">
              Log In
            </Link>
            <Link to="/register" className="navbar-signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;