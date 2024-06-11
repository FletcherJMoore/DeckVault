import { getSingleCard } from './cardData';
import { getSingleGenre } from './genreData';

const viewCardDetails = async (cardFirebaseKey) => {
  const card = await getSingleCard(cardFirebaseKey);
  const genre = await getSingleGenre(card.genre_id);
  return { ...card, genre };
};

export default viewCardDetails;
