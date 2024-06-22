import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PlayingCard from '../../components/Card';
import viewDeckDetails from '../../api/mergedData';

export default function ViewDeck() {
  const [deckDetails, setDeckDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const showDeckDetails = () => {
    viewDeckDetails(firebaseKey).then(setDeckDetails);
  };

  useEffect(() => {
    viewDeckDetails(firebaseKey).then(setDeckDetails);
  }, [firebaseKey]);

  return (
    <div>
      <div className="deck-details-header-container">
        <div className="deck-detials-image">
          <img src={deckDetails.image} alt={deckDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="deck-details">
          <h2 className="deck-details-title">
            {deckDetails.name}
          </h2>
        </div>
      </div>
      <div className="deck-cards-container">
        {deckDetails.cards?.map((deck) => (
          <PlayingCard key={deck.firebaseKey} cardObj={deck} onUpdate={showDeckDetails} />
        ))}
      </div>
    </div>
  );
}
