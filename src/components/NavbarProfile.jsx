import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-lightblue py-3">
    <div className="container d-flex align-items-center justify-content-between">
      <Link className="navbar-brand fw-bold fs-4" to="/">LOGO</Link>
      
      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav mb-2 mb-lg-0 gap-4">
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/">HOME</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/about">ABOUT US</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/our-villa">OUR VILLA</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/faq">FAQ</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/contact">CONTACT</Link>
          </li>
        </ul>
      </div>

      {/* Profile Icon */}
      <div className="profile-icon">
        <FaUserCircle size={32} className="text-dark" />
      </div>
    </div>
  </nav>
);

export default Navbar;
