// PokemonCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PokemonCard.css';

function PokemonCard({ pokemon, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`, { state: { pokemon } });
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
        <button
          className={isFavorite ? 'favorite-btn remove' : 'favorite-btn add'}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon.id);
          }}
        >
          {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
