import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getCardsByUserId } from '../api/cardData';
import PlayingCard from '../components/Card';

function MyCards() {
  const [getCardsByUid, setCardsByUid] = useState([]);
  const { user } = useAuth();

  const getAllCardsByUid = () => {
    getCardsByUserId(user.uid).then(setCardsByUid);
  };

  useEffect(() => {
    getAllCardsByUid();
  }, []);

  return (
    <div className="text-center my-4">
      <Link passHref href="/card/new">
        <Button>Add Card</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {getCardsByUid.map((myCards) => (
          <PlayingCard key={myCards.uid} cardObj={myCards} onUpdate={getAllCardsByUid} />
        ))}
      </div>
    </div>
  );
}

export default MyCards;
