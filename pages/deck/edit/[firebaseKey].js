import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleDeck } from '../../../api/deckData';
import DeckForm from '../../../components/Forms/DeckForm';

export default function EditDeck() {
  const [editDeck, setEditDeck] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDeck(firebaseKey).then(setEditDeck);
  }, [firebaseKey]);

  return <DeckForm obj={editDeck} />;
}
