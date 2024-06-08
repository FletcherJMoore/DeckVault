import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { deleteCard } from '../api/cardData';

function PlayingCard({ cardObj, onUpdate }) {
  const deleteThisCard = () => {
    if (window.confirm(`Delete ${cardObj.name}?`)) {
      deleteCard(cardObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {/* MAKES CARD IMAGE A LINK TO CARD DETAILS  */}
      <Link href={`/card/${cardObj.firebaseKey}`} passHref>
        <Card.Img variant="top" src={cardObj.image} alt={cardObj.name} style={{ height: '400px' }} />
      </Link>
      <Card.Body>
        <Card.Title>{cardObj.name}</Card.Title>
        <p className="card-text bold"><span>Price:</span> ${cardObj.price}</p>
        <p className="card-text bold">{cardObj.private ? '🔒' : ''}</p>
        <Link href={`/card/edit/${cardObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCard} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayingCard.propTypes = {
  cardObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    genre: PropTypes.string,
    private: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayingCard;
