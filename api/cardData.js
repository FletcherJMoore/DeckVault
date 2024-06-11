import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCards = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cards.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleCard = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cards/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCardsByGenre = (uid, firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cards.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const personalCard = Object.values(data).filter((i) => i.genre_id === firebaseKey);
      resolve(personalCard);
    })
    .catch(reject);
});

const createCard = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cards.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateCard = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cards/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCard = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cards/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const privateCards = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cards.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const personalCard = Object.values(data).filter((p) => p.private);
      resolve(personalCard);
    })
    .catch(reject);
});

export {
  getCards,
  getSingleCard,
  getCardsByGenre,
  createCard,
  updateCard,
  deleteCard,
  privateCards,
};
