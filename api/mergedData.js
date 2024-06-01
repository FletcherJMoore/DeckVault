import { getSingleCard } from './cardData';
import { getSingleGenre } from './genreData';

const viewCardDetails = (cardFirebaseKey) => new Promise((resolve, reject) => {
  getSingleCard(cardFirebaseKey)
    .then((cardObject) => {
      getSingleGenre(cardObject.genre_id)
        .then((genreObject) => {
          resolve({ genreObject, ...cardObject });
        });
    }).catch((error) => reject(error));
});

export default viewCardDetails;
