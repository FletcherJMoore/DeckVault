import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { privateCards } from '../api/cardData';
import PlayingCard from '../components/Card';

function MyCards() {
  const [myCards, setMyCards] = useState([]);
  const { user } = useAuth();

  const getPrivateCards = () => {
    privateCards(user.uid).then(setMyCards);
  };

  useEffect(() => {
    getPrivateCards();
  }, []);

  return (
    <div className="text-center my-4">
      <span className="myCards-blur" />
      <span className="myCards-blur" />
      <Link passHref href="/card/new">
        <Button>Add Card</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {myCards.map((q) => (
          <PlayingCard key={q.firebaseKey} cardObj={q} onUpdate={getPrivateCards} />
        ))}
      </div>
    </div>
  );
}

export default MyCards;
