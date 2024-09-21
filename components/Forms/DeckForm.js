import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { getCards } from '../../api/cardData';
import { createDeck, updateDeck } from '../../api/deckData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  image: '',
};

function DeckForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setCards] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCards(user.uid).then(setCards);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateDeck(formInput).then(() => router.push(`/deck/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createDeck(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateDeck(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Deck</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Deck Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Deck Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Deck</Button>
    </Form>
  );
}

DeckForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    deck_id: PropTypes.string,
  }),
};

DeckForm.defaultProps = {
  obj: initialState,
};
export default DeckForm;
