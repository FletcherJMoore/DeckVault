import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { deleteCard } from '../api/cardData';

function PlayingCard({ cardObj, onUpdate }) {
  const deleteThisCard = () => {
    if (window.confirm(`Delete ${cardObj.title}?`)) {
      deleteCard(cardObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {/* MAKES CARD IMAGE A LINK TO CARD DETAILS  */}
      <Link href={`/card/${cardObj.firebaseKey}`} passHref>
        <Card.Img variant="top" src={cardObj.image} alt={cardObj.title} style={{ height: '400px' }} />
      </Link>
      <Card.Body>
        <Card.Title>{cardObj.title}</Card.Title>
        <p className="card-text bold"><span>Price:</span> ${cardObj.price}</p>
        <p className="card-text bold"><span>Release Date:</span> {cardObj.releaseDate}</p>
        <p key={cardObj.uid} className="card-text bold">Genre: {cardObj.genre_id}</p>
        {/* LINK TO EDIT THE BOOK DETAILS  */}
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
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    releaseDate: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    genre_id: PropTypes.arrayOf(
      PropTypes.shape({
        firebaseKey: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayingCard;
