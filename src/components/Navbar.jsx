import React from 'react';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-lightblue py-3">
    <div className="container">
      <a className="navbar-brand fw-bold fs-4" href="#">LOGO</a>
      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav mb-2 mb-lg-0 gap-4">
          {['HOME', 'ABOUT US', 'OUR VILLA', 'FAQ', 'CONTACT'].map((item, idx) => (
            <li className="nav-item" key={idx}>
              <a className="nav-link fw-bold" href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="login">
        <a href="#" className="nav-link fw-bold">LOGIN</a>
      </div>
    </div>
  </nav>
);

export default Navbar;
