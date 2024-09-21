import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewCardDetails } from '../../api/mergedData';

export default function ViewCard() {
  const [cardDetails, setCardDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCardDetails(firebaseKey).then(setCardDetails);
  }, [firebaseKey]);

  return (
    <div>
      <div className="details-header-container">
        <div className="card-detials-image">
          <img src={cardDetails.image} alt={cardDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="card-details">
          <h2 className="card-details-title">
            {cardDetails.name}
          </h2>
          <div className="card-details-sub-title">
            <h4>About this card:</h4>
            <p>Release Date: {cardDetails.releaseDate || ''}</p>
            <p>Price: {cardDetails.price || ''}</p>
            <p>Genre: {cardDetails.genre?.name}</p>
            <p>Description: {cardDetails.description || ''}</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
