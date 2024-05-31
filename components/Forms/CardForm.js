import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCard, getAllCards, updateCard } from '../../api/cardData';

const initialState = {
  image: '',
  title: '',
  description: '',
  releaseDate: '',
  price: '',
};

function CardForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setCards] = useState([]);
  const router = useRouter();
  const { user } = useAuth;

  useEffect(() => {
    getAllCards(user.uid).then(setCards);

    if (obj.firebaseKey) setFormInput(obj);
  }, []);

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
      updateCard(formInput).then(() => router.push(`/card/${obj.firebaseKey}`));
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

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Card Title"
          title="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
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

      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Description"
          title="Description"
          value={formInput.title}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Price"
          price="price"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* RELEASE DATE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Release Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Release Date"
          price="price"
          value={formInput.releaseDate}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Card</Button>
    </Form>
  );
}

CardForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    releaseDate: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CardForm.defaultProps = {
  obj: initialState,
};
export default CardForm;
