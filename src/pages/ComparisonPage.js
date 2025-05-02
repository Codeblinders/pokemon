import React, { useState } from 'react';
import axios from 'axios';
import './ComparisonPage.css';

// ErrorBoundary component to catch rendering errors
class ErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h2>Error: {this.state.errorMessage}</h2>
          <p>Please try again or select different Pokémon.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Modified PokemonCard to show stats
const ComparisonCard = ({ pokemon, isFavorite, toggleFavorite }) => {
  if (!pokemon) return null;

  return (
    <div className="comparison-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
        <div className="stats">
          <h6>Stats:</h6>
          {pokemon.stats.map((stat) => (
            <p key={stat.stat.name} className="stat-item">
              {stat.stat.name}: {stat.base_stat}
            </p>
          ))}
        </div>
        <button
          className={isFavorite ? 'favorite-btn remove' : 'favorite-btn add'}
          onClick={() => toggleFavorite(pokemon.id)}
        >
          {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

const ComparisonPage = ({ favorites, toggleFavorite, isDarkMode }) => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Pokémon by name or ID
  const fetchPokemon = async (query, setPokemon) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setPokemon(response.data);
    } catch (err) {
      setError('Pokémon not found. Please try another name or ID.');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a random Pokémon (ID 1–150 to match App.js)
  const fetchRandomPokemon = async (setPokemon) => {
    setLoading(true);
    setError(null);
    try {
      const randomId = Math.floor(Math.random() * 150) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setPokemon(response.data);
    } catch (err) {
      setError('Failed to load random Pokémon. Please try again.');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submissions
  const handleSearch1 = (e) => {
    e.preventDefault();
    fetchPokemon(search1, setPokemon1);
  };

  const handleSearch2 = (e) => {
    e.preventDefault();
    fetchPokemon(search2, setPokemon2);
  };

  return (
    <ErrorBoundary>
      <div className="comparison-page">
        <h1>Compare Pokémon</h1>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading...</div>}
        <div className="comparison-container">
          {/* Pokémon 1 */}
          <div className="pokemon-section">
            <form className="search-form" onSubmit={handleSearch1}>
              <input
                type="text"
                value={search1}
                onChange={(e) => setSearch1(e.target.value)}
                placeholder="Enter Pokémon name or ID"
                className="search-input"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
            <button
              onClick={() => fetchRandomPokemon(setPokemon1)}
              className="random-btn"
            >
              Random Pokémon
            </button>
            {pokemon1 && (
              <ComparisonCard
                pokemon={pokemon1}
                isFavorite={favorites.includes(pokemon1.id)}
                toggleFavorite={toggleFavorite}
              />
            )}
          </div>
          {/* Pokémon 2 */}
          <div className="pokemon-section">
            <form className="search-form" onSubmit={handleSearch2}>
              <input
                type="text"
                value={search2}
                onChange={(e) => setSearch2(e.target.value)}
                placeholder="Enter Pokémon name or ID"
                className="search-input"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
            <button
              onClick={() => fetchRandomPokemon(setPokemon2)}
              className="random-btn"
            >
              Random Pokémon
            </button>
            {pokemon2 && (
              <ComparisonCard
                pokemon={pokemon2}
                isFavorite={favorites.includes(pokemon2.id)}
                toggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ComparisonPage;