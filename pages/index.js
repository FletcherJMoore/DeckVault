import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getCards, getCardsByGenre } from '../api/cardData';
import PlayingCard from '../components/Card';
import { getGenres } from '../api/genreData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [cards, setCards] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [activeAllFilter, setActiveAllFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const { user } = useAuth();

  const getAllTheCards = () => {
    setIsFiltered(false);
    setActiveFilter(null);
    setActiveAllFilter(true);
    getCards(user.uid).then(setCards);
  };

  const genreFilter = () => {
    getGenres().then(setGenres);
  };

  const cardsByGenre = (firebaseKey) => {
    getCardsByGenre(user.uid, firebaseKey).then(setFilteredCards);
    setIsFiltered(true);
  };

  const handleClick = (firebaseKey) => {
    setActiveAllFilter(false);
    setActiveFilter(firebaseKey);
    cardsByGenre(firebaseKey);
  };

  useEffect(() => {
    genreFilter();
    getAllTheCards();
  }, []);

  return (
    <>
      <div className="all-cards-page">
        <span className="blur" />
        <span className="blur" />
        <h1 className="all-cards-header">All Cards</h1>
        <div className="filter-buttons-container">
          <Button className={activeAllFilter ? 'selected' : 'notSelected'} variant="dark" onClick={() => getAllTheCards()}>All</Button>
          {genres.map((m) => (
            <Button
              key={m.firebaseKey}
              variant="dark"
              className={activeFilter === m.firebaseKey ? 'selected' : 'notSelected'}
              onClick={() => handleClick(m.firebaseKey)}
            >{m.name}
            </Button>
          ))}
        </div>
        <div className="general-cards-container">
          {isFiltered ? filteredCards.map((g) => (
            <PlayingCard key={g.firebaseKey} cardObj={g} onUpdate={getAllTheCards} />
          )) : cards.map((c) => (
            <PlayingCard key={c.firebaseKey} cardObj={c} onUpdate={getAllTheCards} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Home;
