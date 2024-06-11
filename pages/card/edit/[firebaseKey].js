import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleCard } from '../../../api/cardData';
import CardForm from '../../../components/Forms/CardForm';

export default function EditCard() {
  const [editCard, setEditCard] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCard(firebaseKey).then(setEditCard);
  }, [firebaseKey]);

  return <CardForm obj={editCard} />;
}
