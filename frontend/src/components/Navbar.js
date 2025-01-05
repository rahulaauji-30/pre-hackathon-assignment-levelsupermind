import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import light from '../assests/images/light.svg';
import darkWhite from '../assests/images/dark-white.svg';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {Link} from "react-router-dom"
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Function to handle dark mode toggle
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to apply dark mode based on the state
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#1E1E1E"; // Dark background
      localStorage.setItem('theme', 'dark'); // Store preference
      document.getElementById('root')?.classList.remove('light');
    } else {
      document.body.style.backgroundColor = "#FFFFFF"; // Light background
      localStorage.setItem('theme', 'light'); // Store preference
      document.getElementById('root')?.classList.add('light');
    }
  }, [darkMode]);
  

  // Load theme preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-texts">
        <Link to="/"  style={{textDecoration:"none"}} id="brand-logo">Astrainsight</Link>
        <div className="navbar-links">
          <Link to="/chat">Chat</Link>
          <Link to="#team">Team</Link>
        </div>
      </div>
      <div className="navbar-mode">
        <DarkModeOutlinedIcon style={{color:"var(--moon-color)"}}/>
        {darkMode ? (
          <ToggleOnIcon fontSize="large" color="primary" onClick={handleDarkMode}style={{fontSize:"45px"}} />
        ) : (
          <ToggleOffIcon fontSize="large" style={{color:"lightgray",fontSize:"45px"}} onClick={handleDarkMode} />
        )}
        <img src={light} alt="light" />
      </div>
    </nav>
  );
};

export default Navbar;
