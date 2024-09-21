import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { deleteDeck } from '../api/deckData';

function Deck({ deckObj, onUpdate }) {
  const deleteTheDeck = () => {
    if (window.confirm(`Delete ${deckObj.name}?`)) {
      deleteDeck(deckObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="cards">
      <Card>
        <Card.Img variant="top" src={deckObj.image} alt={deckObj.name} style={{ height: '400px' }} />
        <Card.Body className="card-body">
          <div className="card-title">
            <Card.Title>{deckObj.name}</Card.Title>
          </div>
          <div className="card-buttons">
            <Link href={`/deck/${deckObj.firebaseKey}`} passHref>
              <Button>View</Button>
            </Link>
            <Link href={`/deck/edit/${deckObj.firebaseKey}`} passHref>
              <Button className="edit-button" variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteTheDeck} className="m-2">
              DELETE
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

Deck.propTypes = {
  deckObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Deck;
