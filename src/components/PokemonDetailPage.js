import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PokemonDetailModal from './PokemonDetailModal'; // Reuse modal layout

const PokemonDetailPage = ({ favorites, toggleFavorite }) => {
  const { id } = useParams();
  const location = useLocation();
  const pokemon = location.state?.pokemon;

  if (!pokemon) return <div>Loading or data not passed correctly.</div>;

  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="pokemon-detail-page">
      <PokemonDetailModal
        show={true}
        onHide={() => window.history.back()}
        pokemon={pokemon}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default PokemonDetailPage;
