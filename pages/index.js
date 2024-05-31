import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { getAllCards } from '../api/cardData';
import PlayingCard from '../components/Card';

function Home() {
  const [cards, setCards] = useState([]);
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH

  const getAllTheCards = () => {
    getAllCards(user.uid).then(setCards);
  };

  useEffect(() => {
    getAllTheCards();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/card/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      {/* TODO: map over books here using BookCard component */}
      <div className="d-flex flex-wrap">
        {cards.map((card) => (
          <PlayingCard key={card.firebaseKey} cardObj={card} onUpdate={getAllTheCards} />
        ))}
      </div>
    </div>
  );
}
export default Home;
