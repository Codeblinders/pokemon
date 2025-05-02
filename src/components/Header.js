import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.header-nav') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <Link to="/" className="header-brand">Pokédex</Link>

      <div className="header-controls">
        <div className="header-toggle">
          <input
            type="checkbox"
            id="dark-mode-switch"
            onChange={toggleDarkMode}
            checked={isDarkMode}
          />
          <label htmlFor="dark-mode-switch">Dark Mode</label>
        </div>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
        <Link to="/compare" onClick={() => setIsMenuOpen(false)}>Compare</Link>
      </nav>
    </header>
  );
};

export default Header;