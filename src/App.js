import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import PokemonDetailPage from './components/PokemonDetailPage'; // import it

import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load theme and favorites from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    const storedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (storedTheme === 'true') setIsDarkMode(true);
    setFavorites(storedFavs);
  }, []);

  // Persist theme and favorites
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [isDarkMode, favorites]);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = res.data.results;
        const promises = results.map(poke => axios.get(poke.url));
        const pokemonData = await Promise.all(promises);
        const pokemonDetails = pokemonData.map(p => p.data).sort((a, b) => a.id - b.id);
        setAllPokemon(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon data.');
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.body.setAttribute('data-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };
  const toggleFavorite = (pokemonId) => {
    setFavorites(prev => 
      prev.includes(pokemonId) ? prev.filter(id => id !== pokemonId) : [...prev, pokemonId]
    );
  };

  const favoritePokemons = favorites.map(id => allPokemon.find(p => p.id === id)).filter(p => p);

  return (
    <Router>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route 
          exact 
          path="/" 
          element={<HomePage 
            allPokemon={allPokemon}
            loading={loading}
            error={error}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            isDarkMode={isDarkMode}
          />} 
        />
        <Route 
          path="/favorites" 
          element={<FavoritesPage 
            favorites={favoritePokemons}
            toggleFavorite={toggleFavorite}
            isDarkMode={isDarkMode}
          />} 
        />

<Route path="/" element={<HomePage />} />
    <Route
      path="/pokemon/:id"
      element={<PokemonDetailPage favorites={favorites} toggleFavorite={toggleFavorite} />}
    />
      </Routes>
    </Router>
  );
}

export default App;
