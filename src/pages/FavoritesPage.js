import React, { useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonDetailModal from '../components/PokemonDetailModal';
import './FavoritesPage.css';

function FavoritesPage({ favorites, toggleFavorite }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="favorites-page">
      <h1>
        Your Favorites <span className="favorite-badge">{favorites.length}</span>
      </h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorite Pokémon yet. Go catch some!</p>
      ) : (
        <div className="favorites-container">
          {favorites.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
      <PokemonDetailModal
        show={showModal}
        onHide={handleCloseModal}
        pokemon={selectedPokemon}
      />
    </div>
  );
}

export default FavoritesPage;