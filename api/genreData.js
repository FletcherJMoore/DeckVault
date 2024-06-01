import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGenres = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/genre.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json(uid))
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleGenre = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/genre/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getGenres,
  getSingleGenre,
};
