import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCard, updateCard } from '../../api/cardData';
import { getGenres } from '../../api/genreData';

const initialState = {
  image: '',
  title: '',
  description: '',
  releaseDate: '',
  price: '',
};

function CardForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [genres, setGenres] = useState([]);
  const router = useRouter();
  const { user } = useAuth;

  useEffect(() => {
    getGenres(user).then(setGenres);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
      updateCard(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user };
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
      <FloatingLabel controlId="floatingInput1" label="Card Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Card Title"
          name="title"
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

      {/* PRICE INPUT  */}
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

      {/* RELEASE DATE INPUT  */}
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

      {/* DESCRIPTION INPUT  */}
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

      {/* GENRE SELECT  */}
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
            genres.map((g) => (
              <option
                key={g.firebaseKey}
                value={g.firebaseKey}
              >
                {g.name}
              </option>
            ))
          }
        </Form.Select>
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
    genre_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CardForm.defaultProps = {
  obj: initialState,
};
export default CardForm;
