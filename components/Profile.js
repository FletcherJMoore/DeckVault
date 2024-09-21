import React from 'react';
// import Button from 'react-bootstrap/Button'; // TODO: Uncomment if you decide to put the sign out button back on the user page
// import { signOut } from '../utils/auth';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function User() {
  const { user } = useAuth();
  return (
    <>
      <div className="profile-container">
        <div className="profile-img">
          <img src={user.photoURL} alt={user.displayName} style={{ borderRadius: '50%', width: 175, height: 175 }} />
        </div>
        <div className="profile-text">
          <span><h1>{user.displayName}! </h1><p>{user.email}</p></span>
        </div>
        <div className="decks">
          <h1>Your Decks</h1>
          <div className="create-deck-btn">
            <Link passHref href="/deck/new">
              <Button className="decks-btn" style={{ backgroundColor: 'none' }}>Create Deck</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
