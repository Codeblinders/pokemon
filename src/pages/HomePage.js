import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';
import PokemonDetailModal from '../components/PokemonDetailModal';
import './HomePage.css';

const HomePage = ({ allPokemon, loading, error, favorites, toggleFavorite, isDarkMode }) => {
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 20;

  useEffect(() => {
    let filtered = allPokemon;
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (typeFilter !== 'All') {
      filtered = filtered.filter(p => p.types.some(t => t.type.name.toLowerCase() === typeFilter.toLowerCase()));
    }
    setFilteredPokemon(filtered);
  }, [searchQuery, typeFilter, allPokemon]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);
  

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPokemons = filteredPokemon.slice(indexOfFirst, indexOfLast);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="home-page">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="filters">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterDropdown onChange={setTypeFilter} />
      </div>
      {!loading && !currentPokemons.length && (
        <p className="no-results">No Pokémon found.</p>
      )}
      <div className="pokemon-grid">
        {currentPokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.includes(pokemon.id)}
            toggleFavorite={toggleFavorite}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      <Pagination
        totalItems={filteredPokemon.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <PokemonDetailModal
  show={showModal}
  onHide={handleCloseModal}
  pokemon={selectedPokemon}
  isFavorite={selectedPokemon ? favorites.includes(selectedPokemon.id) : false}
  toggleFavorite={toggleFavorite}
/>
    </div>
  );
};

export default HomePage;