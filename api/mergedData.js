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

// const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
//   getSingleBook(bookFirebaseKey)
//     .then((bookObject) => {
//       getSingleAuthor(bookObject.author_id)
//         .then((authorObject) => {
//           resolve({ authorObject, ...bookObject });
//         });
//     }).catch((error) => reject(error));
// });

export default viewCardDetails;
