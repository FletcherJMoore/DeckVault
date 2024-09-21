import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCard, updateCard } from '../../api/cardData';
import { getGenres } from '../../api/genreData';
import { getDecks } from '../../api/deckData';

const initialState = {
  image: '',
  name: '',
  description: '',
  releaseDate: '',
  price: '',
  private: false,
};

function CardForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [genres, setGenres] = useState([]);
  const [decks, setDecks] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGenres().then(setGenres);
    getDecks(user.uid).then(setDecks);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (q) => {
    q.preventDefault();
    if (obj.firebaseKey) {
      updateCard(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCard(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCard(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Card</h2>

      <FloatingLabel controlId="floatingInput1" label="Card Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Card Title"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Card Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput5" label="Card Release Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Release Date"
          name="releaseDate"
          value={formInput.releaseDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Card Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Genre">
        <Form.Select
          aria-label="Genre"
          name="genre_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.genre_id}
          required
        >
          <option value="">Select an Genre</option>
          {
            genres.map((a) => (
              <option
                key={a.firebaseKey}
                value={a.firebaseKey}
              >
                {a.name}
              </option>
            ))
          }
        </Form.Select>

      </FloatingLabel>
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="private"
        name="private"
        label="Is Private?"
        checked={formInput.private}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            private: e.target.checked,
          }));
        }}
      />

      <FloatingLabel controlId="floatingSelect" label="Deck">
        <Form.Select
          aria-label="Deck"
          name="deck_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.deck_id}
        >
          <option value="">Add card to a deck!</option>
          {
            decks.map((d) => (
              <option
                key={d.firebaseKey}
                value={d.firebaseKey}
              >
                {d.name}
              </option>
            ))
          }
        </Form.Select>

      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Card</Button>
    </Form>
  );
}

CardForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    releaseDate: PropTypes.string,
    description: PropTypes.string,
    private: PropTypes.bool,
    genre_id: PropTypes.string,
    deck_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CardForm.defaultProps = {
  obj: initialState,
};
export default CardForm;
