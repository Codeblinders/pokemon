import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleDarkMode }) => (
  <header className="header">
    <Link to="/" className="header-brand">Pokédex</Link>
    <nav className="header-nav">
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
    <div className="header-toggle">
      <input
        type="checkbox"
        id="dark-mode-switch"
        onChange={toggleDarkMode}
        checked={isDarkMode}  
      />
      <label htmlFor="dark-mode-switch">Dark Mode</label>
    </div>
  </header>
);

export default Header;
