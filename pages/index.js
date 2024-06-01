import React, { useEffect, useState } from 'react';
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
    <>
      {/* map over card here using BookCard component */}
      <div className="d-flex flex-wrap">
        {cards.map((card) => (
          <PlayingCard key={card.firebaseKey} cardObj={card} onUpdate={getAllTheCards} />
        ))}
      </div>
    </>
  );
}
export default Home;
