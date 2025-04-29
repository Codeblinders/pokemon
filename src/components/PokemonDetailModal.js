import React from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap';
import './PokemonDetailModal.css';

const PokemonDetailModal = ({ show, onHide, pokemon, isFavorite, toggleFavorite }) => {
  if (!pokemon) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #{pokemon.id.toString().padStart(3, '0')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="pokemon-image-container">
          <img 
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="pokemon-image"
          />
        </div>

        <div className="types-section">
          <h5>Types</h5>
          {pokemon.types.map((t, idx) => (
            <Badge key={idx} className="type-badge">
              {t.type.name}
            </Badge>
          ))}
        </div>

        <div className="abilities-section">
          <h5>Abilities</h5>
          <ul>
            {pokemon.abilities.map((a, idx) => (
              <li key={idx}>{a.ability.name.replace('-', ' ')}</li>
            ))}
          </ul>
        </div>

        <div className="stats-section">
          <h5>Base Stats</h5>
          <Table striped bordered hover className="stats-table">
            <tbody>
              {pokemon.stats.map((s, idx) => (
                <tr key={idx}>
                  <td className="text-capitalize">{s.stat.name.replace('-', ' ')}</td>
                  <td className="fw-bold">{s.base_stat}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='button-d'
          variant={isFavorite ? 'danger' : 'primary'} 
          onClick={() => toggleFavorite(pokemon.id)}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '♡ Add to Favorites'}
        </Button>
        <Button className='button-d' variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonDetailModal;