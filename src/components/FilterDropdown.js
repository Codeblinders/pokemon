import React, { useState, useEffect } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ onChange }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(res => res.json())
      .then(data => {
        const allTypes = data.results.map(t => t.name.charAt(0).toUpperCase() + t.name.slice(1));
        setTypes(['All', ...allTypes]);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="filter-dropdown">
      <select onChange={(e) => onChange(e.target.value)}>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;