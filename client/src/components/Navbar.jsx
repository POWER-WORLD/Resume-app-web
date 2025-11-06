import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/nav_logo.png";
import "../assets/styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar({ isOpen = false, onClose = () => {} }) {
  // close sidebar after navigating on small screens
  const handleNavClick = () => {
    if (window.innerWidth < 1025) onClose();
  };

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`sidebar ${isOpen ? "active" : ""}`}
      aria-hidden={!isOpen && window.innerWidth < 1025}
    >
      <div className="logo">
        <img src={logo} alt="logo" />
        <h2>Portfolio</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>

      {/* user greeting + logout shown immediately after logo */}
      <div className="nav-user-area">
        {user ? (
          <>
            <span className="nav-user">Hello, {user.fullName}</span>
            <button className="btn btn-primary logout-inline" onClick={handleLogout}>Logout</button>
          </>
        ) : null}
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end onClick={handleNavClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={handleNavClick}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills" onClick={handleNavClick}>
            Skills
          </NavLink>
        </li>
        <li>
          <NavLink to="/experience" onClick={handleNavClick}>
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" onClick={handleNavClick}>
            Projects
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <small>© {new Date().getFullYear()}</small>
      </div>
    </nav>
  );
}

export default Navbar;
