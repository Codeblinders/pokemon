import React from 'react';
import './PokemonCard.css';

function PokemonCard({ pokemon, isFavorite, toggleFavorite, onCardClick }) {
  return (
    <div className="pokemon-card" onClick={onCardClick ? () => onCardClick(pokemon) : undefined}>
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