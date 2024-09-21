import React, { useEffect, useState } from 'react';
import User from '../components/Profile';
import Deck from '../components/Deck';
import { getDecks } from '../api/deckData';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const [deck, setDeck] = useState([]);
  const { user } = useAuth();

  const getAllTheDecks = () => {
    getDecks(user.uid).then(setDeck);
  };

  useEffect(() => {
    getAllTheDecks();
  }, []);

  return (
    <div>
      <span className="blur" />
      <span className="blur" />
      <User />
      <div className="profile-deck-container">
        {deck.map((decks) => (
          <Deck key={decks.firebaseKey} deckObj={decks} onUpdate={getAllTheDecks} />
        ))}
      </div>
      <div />
    </div>

  );
}
