import { getSingleCard } from './cardData';
import { getCardsFromDeck, getSingleDeck } from './deckData';
import { getSingleGenre } from './genreData';

const viewCardDetails = (cardFirebaseKey) => new Promise((resolve, reject) => {
  getSingleCard(cardFirebaseKey)
    .then((card) => {
      getSingleGenre(card.genre_id)
        .then((genre) => {
          resolve({ genre, ...card });
        });
    }).catch((error) => reject(error));
});

const viewDeckDetails = (deckFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleDeck(deckFirebaseKey), getCardsFromDeck(deckFirebaseKey)])
    .then(([deckObject, deckOfCardsArray]) => {
      resolve({ ...deckObject, cards: deckOfCardsArray });
    }).catch((error) => reject(error));
});

// const viewCardDetails = async (cardFirebaseKey) => {
//   const card = await getSingleCard(cardFirebaseKey);
//   const genre = await getSingleGenre(card.genre_id);
//   return { ...card, genre };
// };

export { viewCardDetails, viewDeckDetails };
