import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search Pokémon by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
