import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import viewCardDetails from '../../api/mergedData';

export default function ViewCard() {
  const [cardDetails, setCardDetails] = useState({});
  const router = useRouter();

  // Making a call to the cards firebase key to update the URL
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCardDetails(firebaseKey).then(setCardDetails);
  }, [firebaseKey]);

  return (
    <div>
      <div className="details-header-container">
        <h5>
          Title: {cardDetails.name}
        </h5>
        <p>Release Date: {cardDetails.releaseDate || ''}</p>
        <p>Price: {cardDetails.price || ''}</p>
        <p>Genre: {cardDetails.genre?.name}</p>
        <p>Description: {cardDetails.description || ''}</p>
        <hr />
      </div>
      <div className="center-image">
        <img src={cardDetails.image} alt={cardDetails.name} style={{ width: '300px' }} />
      </div>
    </div>
  );
}
