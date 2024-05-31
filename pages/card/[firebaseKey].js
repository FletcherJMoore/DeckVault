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
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={cardDetails.image} alt={cardDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          Title: {cardDetails.title}
        </h5>
        <p>Description: {cardDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}
